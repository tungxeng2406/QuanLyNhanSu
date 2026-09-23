package vn.tungxeng.hr.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeRequest(
        @NotBlank @Size(min = 3, max = 20) @Pattern(regexp = "^[A-Z0-9_-]+$") String employeeCode,
        @NotBlank @Size(min = 2, max = 150) String fullName,
        @Pattern(regexp = "MALE|FEMALE|OTHER") String gender,
        @PastOrPresent LocalDate dateOfBirth,
        @Pattern(regexp = "^(\\+84|0)[0-9]{9,10}$") String phone,
        @Email @Size(max = 150) String email,
        @Size(max = 255) String address,
        @Size(max = 100) String department,
        @Size(max = 100) String position,
        LocalDate hireDate,
        @NotNull EmployeeStatusValue status,
        @DecimalMin(value = "0.00") @Digits(integer = 16, fraction = 2) BigDecimal baseSalary,
        @Size(max = 500) String note
) {
}
