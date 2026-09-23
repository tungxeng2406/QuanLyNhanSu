package vn.tungxeng.hr.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.tungxeng.hr.dto.EmployeeRequest;
import vn.tungxeng.hr.dto.EmployeeResponse;
import vn.tungxeng.hr.entity.EmployeeStatus;

import java.time.LocalDate;

public interface EmployeeService {
    Page<EmployeeResponse> search(String employeeCode, String fullName, String gender,
                                  LocalDate dateOfBirth, String phone, String email, Pageable pageable);
    EmployeeResponse getById(Long id);
    EmployeeResponse create(EmployeeRequest request);
    EmployeeResponse update(Long id, EmployeeRequest request);
    void delete(Long id);
    byte[] exportCsv(String employeeCode, String fullName, String gender,
                     LocalDate dateOfBirth, String phone, String email, Pageable pageable);
}
