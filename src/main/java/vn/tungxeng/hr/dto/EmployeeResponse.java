package vn.tungxeng.hr.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EmployeeResponse(
        Long id,
        String employeeCode,
        String fullName,
        String gender,
        LocalDate dateOfBirth,
        String phone,
        String email,
        String address,
        String department,
        String position,
        LocalDate hireDate,
        String status,
        BigDecimal baseSalary,
        String note,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
