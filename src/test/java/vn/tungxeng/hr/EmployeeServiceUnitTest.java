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
import java.nio.charset.StandardCharsets;
import java.util.List;
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
}
