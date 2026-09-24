package vn.tungxeng.hr.service.impl;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.tungxeng.hr.dto.EmployeeRequest;
import vn.tungxeng.hr.dto.EmployeeResponse;
import vn.tungxeng.hr.entity.Employee;
import vn.tungxeng.hr.exception.BusinessException;
import vn.tungxeng.hr.exception.NotFoundException;
import vn.tungxeng.hr.repository.EmployeeRepository;
import vn.tungxeng.hr.service.EmployeeService;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class EmployeeServiceImpl implements EmployeeService {
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ISO_LOCAL_DATE;
    private final EmployeeRepository repository;

    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<EmployeeResponse> search(String employeeCode, String fullName, String gender,
                                         LocalDate dateOfBirth, String phone, String email, Pageable pageable) {
        return repository.findAll(buildSpecification(employeeCode, fullName, gender, dateOfBirth, phone, email), pageable)
                .map(this::toResponse);
    }

    @Override
    public EmployeeResponse getById(Long id) {
        return toResponse(findEmployee(id));
    }

    @Override
    @Transactional
    public EmployeeResponse create(EmployeeRequest request) {
        String code = normalize(request.employeeCode());
        if (repository.existsByEmployeeCode(code)) {
            throw new BusinessException("Ma nhan vien da ton tai: " + code);
        }
        Employee employee = new Employee(code, normalize(request.fullName()), request.gender(), request.dateOfBirth(),
            request.phone(), normalizeNullable(request.email()));
        return toResponse(repository.save(employee));
    }

    @Override
    @Transactional
    public EmployeeResponse update(Long id, EmployeeRequest request) {
        Employee employee = findEmployee(id);
        String code = normalize(request.employeeCode());
        repository.findByEmployeeCode(code).filter(found -> !found.getId().equals(id)).ifPresent(found -> {
            throw new BusinessException("Ma nhan vien da ton tai: " + code);
        });
        employee.setEmployeeCode(code);
        employee.setFullName(normalize(request.fullName()));
        employee.setGender(request.gender());
        employee.setDateOfBirth(request.dateOfBirth());
        employee.setPhone(request.phone());
        employee.setEmail(normalizeNullable(request.email()));
        return toResponse(repository.save(employee));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.delete(findEmployee(id));
    }

    @Override
    public byte[] exportCsv(String employeeCode, String fullName, String gender,
                            LocalDate dateOfBirth, String phone, String email, Pageable pageable) {
        List<Employee> employees = repository.findAll(buildSpecification(employeeCode, fullName, gender, dateOfBirth, phone, email), pageable).getContent();
        StringBuilder csv = new StringBuilder("\uFEFFemployeeCode,fullName,gender,dateOfBirth,phone,email\n");
        for (Employee employee : employees) {
            csv.append(csvRow(employee)).append('\n');
        }
        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    private Specification<Employee> buildSpecification(String employeeCode, String fullName, String gender,
                                                        LocalDate dateOfBirth, String phone, String email) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            addContainsPredicate(predicates, cb, root.get("employeeCode"), employeeCode);
            addContainsPredicate(predicates, cb, root.get("fullName"), fullName);
            addContainsPredicate(predicates, cb, root.get("phone"), phone);
            addContainsPredicate(predicates, cb, root.get("email"), email);
            if (gender != null && !gender.isBlank()) predicates.add(cb.equal(root.get("gender"), gender.trim()));
            if (dateOfBirth != null) predicates.add(cb.equal(root.get("dateOfBirth"), dateOfBirth));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private void addContainsPredicate(List<Predicate> predicates, jakarta.persistence.criteria.CriteriaBuilder cb,
                                      jakarta.persistence.criteria.Expression<String> field, String value) {
        if (value != null && !value.isBlank()) {
            predicates.add(cb.like(cb.lower(field), "%" + value.trim().toLowerCase() + "%"));
        }
    }

    private Employee findEmployee(Long id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Khong tim thay nhan su: " + id));
    }

    private EmployeeResponse toResponse(Employee e) {
        return new EmployeeResponse(e.getId(), e.getEmployeeCode(), e.getFullName(), e.getGender(), e.getDateOfBirth(),
            e.getPhone(), e.getEmail());
    }

    private String csvRow(Employee e) {
        return String.join(",", csv(e.getEmployeeCode()), csv(e.getFullName()), csv(e.getGender()), csv(date(e.getDateOfBirth())),
            csv(e.getPhone()), csv(e.getEmail()));
    }

    private String csv(Object value) {
        if (value == null) return "";
        String text = value.toString().replace("\"", "\"\"");
        return "\"" + text + "\"";
    }

    private String date(LocalDate value) { return value == null ? null : value.format(DATE_FORMAT); }
    private String normalize(String value) { return value == null ? null : value.trim(); }
    private String normalizeNullable(String value) { return value == null || value.isBlank() ? null : value.trim(); }
}
