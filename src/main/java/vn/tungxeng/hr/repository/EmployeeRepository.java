package vn.tungxeng.hr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vn.tungxeng.hr.entity.Employee;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
    boolean existsByEmployeeCode(String employeeCode);
    Optional<Employee> findByEmployeeCode(String employeeCode);
}
