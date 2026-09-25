package vn.tungxeng.hr;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vn.tungxeng.hr.dto.EmployeeRequest;
import vn.tungxeng.hr.entity.Employee;
import vn.tungxeng.hr.exception.BusinessException;
import vn.tungxeng.hr.exception.NotFoundException;
import vn.tungxeng.hr.repository.EmployeeRepository;
import vn.tungxeng.hr.service.impl.EmployeeServiceImpl;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class EmployeeServiceUnitTest {
    EmployeeRepository repository;
    EmployeeServiceImpl service;

    @BeforeEach void setup() {
        repository = mock(EmployeeRepository.class);
        service = new EmployeeServiceImpl(repository);
    }

    @Test void BE_SVC_004_createTrimsAndSavesOnce() {
        when(repository.save(any())).thenAnswer(call -> call.getArgument(0));
        var result = service.create(new EmployeeRequest(" UNIT01 ", " Test Name ", null, null, null, " test@example.com "));
        assertThat(result.employeeCode()).isEqualTo("UNIT01");
        assertThat(result.fullName()).isEqualTo("Test Name");
        assertThat(result.email()).isEqualTo("test@example.com");
        verify(repository, times(1)).save(any(Employee.class));
    }

    @Test void BE_SVC_005_duplicateDoesNotSave() {
        when(repository.existsByEmployeeCode("E001")).thenReturn(true);
        assertThatThrownBy(() -> service.create(new EmployeeRequest("E001", "Test Name", null, null, null, null)))
            .isInstanceOf(BusinessException.class);
        verify(repository, never()).save(any());
    }

    @Test void BE_SVC_001_searchMapsPageToPublicResponse() {
        var employee = new Employee("UNIT01", "Test Name", "MALE", LocalDate.of(1990,1,10), "0901234567", "test@example.com");
        setEntityId(employee, 10L);
        when(repository.findAll(any(Specification.class), any(Pageable.class)))
            .thenReturn(new PageImpl<>(List.of(employee), PageRequest.of(0, 10), 1));

        var result = service.search("UNIT", "Test", "MALE", LocalDate.of(1990,1,10), "090", "test", PageRequest.of(0, 10));

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).employeeCode()).isEqualTo("UNIT01");
        assertThat(result.getContent().get(0).fullName()).isEqualTo("Test Name");
        assertThat(result.getContent().get(0).phone()).isEqualTo("0901234567");
        assertThat(result.getContent().get(0).email()).isEqualTo("test@example.com");
    }

    @Test void BE_SVC_002_updateRejectsDuplicateCodeOnAnotherRecord() {
        var existing = new Employee("UNIT01", "Current Name", "MALE", LocalDate.of(1990,1,10), "0900000001", "current@example.com");
        setEntityId(existing, 1L);
        var duplicateCandidate = new Employee("UNIT02", "Other Name", "FEMALE", LocalDate.of(1988,2,2), "0900000002", "other@example.com");
        setEntityId(duplicateCandidate, 2L);

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.findByEmployeeCode("UNIT02")).thenReturn(Optional.of(duplicateCandidate));

        assertThatThrownBy(() -> service.update(1L, new EmployeeRequest("UNIT02", "Updated Name", "FEMALE", LocalDate.of(1988,2,2), "0900000002", "other@example.com")))
            .isInstanceOf(BusinessException.class);
        verify(repository, never()).save(any(Employee.class));
    }

    @Test void BE_SVC_008_missingGetAndDelete() {
        assertThatThrownBy(() -> service.getById(999L)).isInstanceOf(NotFoundException.class);
        assertThatThrownBy(() -> service.delete(999L)).isInstanceOf(NotFoundException.class);
        verify(repository, never()).delete(any(Employee.class));
    }

    @Test void BE_SVC_009_csvEscapesUnicodeQuotesAndNulls() {
        when(repository.findAll(any(Specification.class), any(Pageable.class)))
            .thenReturn(new PageImpl<>(List.of(new Employee("UNIT01", "Nguyễn, \"An\"\nB", null, null, null, null))));
        String csv = new String(service.exportCsv(null, null, null, null, null, null, PageRequest.of(0, 100)), StandardCharsets.UTF_8);
        assertThat(csv).isEqualTo("\uFEFFemployeeCode,fullName,gender,dateOfBirth,phone,email\n\"UNIT01\",\"Nguyễn, \"\"An\"\"\nB\",,,,\n");
    }

    @Test void BE_SVC_010_emptyCsv() {
        when(repository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(new PageImpl<>(List.of()));
        assertThat(new String(service.exportCsv(null, null, null, null, null, null, PageRequest.of(0, 100)), StandardCharsets.UTF_8))
            .isEqualTo("\uFEFFemployeeCode,fullName,gender,dateOfBirth,phone,email\n");
    }

    private static void setEntityId(Employee employee, Long id) {
        try {
            Field field = Employee.class.getDeclaredField("id");
            field.setAccessible(true);
            field.set(employee, id);
        } catch (NoSuchFieldException | IllegalAccessException e) {
            throw new RuntimeException("Unable to set employee id in unit test", e);
        }
    }
}
