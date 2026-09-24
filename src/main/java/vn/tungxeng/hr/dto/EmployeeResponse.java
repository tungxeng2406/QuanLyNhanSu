package vn.tungxeng.hr.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeResponse(
        Long id,
        String employeeCode,
        String fullName,
        String gender,
        LocalDate dateOfBirth,
        String phone,
        String email
) {
}
