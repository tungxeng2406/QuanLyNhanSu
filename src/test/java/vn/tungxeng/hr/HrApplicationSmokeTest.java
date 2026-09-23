package vn.tungxeng.hr;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import vn.tungxeng.hr.repository.EmployeeRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class HrApplicationSmokeTest {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    void testProfileLoadsSchemaAndFixtures() {
        assertThat(employeeRepository.count()).isEqualTo(50);
        assertThat(employeeRepository.findByEmployeeCode("E001")).isPresent();
    }
}