package vn.tungxeng.hr.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.tungxeng.hr.dto.EmployeeListResponse;
import vn.tungxeng.hr.dto.EmployeeRequest;
import vn.tungxeng.hr.dto.EmployeeResponse;
import vn.tungxeng.hr.entity.EmployeeStatus;
import vn.tungxeng.hr.service.EmployeeService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private static final Set<String> SORT_FIELDS = Set.of("employeeCode", "fullName", "department", "hireDate", "status");
    private static final DateTimeFormatter FILE_TIME = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public EmployeeListResponse list(
            @RequestParam(required = false) String employeeCode,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "employeeCode,asc") String sort) {
        PageRequest pageable = pageRequest(page, size, sort);
        Page<EmployeeResponse> result = service.search(employeeCode, fullName, gender, dateOfBirth, phone, email, pageable);
        return new EmployeeListResponse(result.getContent(), result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages(), sort);
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> create(@Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.status(201).body(service.create(request));
    }

    @GetMapping("/{id}")
    public EmployeeResponse detail(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public EmployeeResponse update(@PathVariable Long id, @Valid @RequestBody EmployeeRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/export/csv", produces = "text/csv")
    public ResponseEntity<byte[]> exportCsv(
            @RequestParam(required = false) String employeeCode,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateOfBirth,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "employeeCode,asc") String sort) {
        PageRequest pageable = pageRequest(0, 10000, sort);
        byte[] content = service.exportCsv(employeeCode, fullName, gender, dateOfBirth, phone, email, pageable);
        String filename = "employees_" + LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")).format(FILE_TIME) + ".csv";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv; charset=UTF-8"));
        headers.setContentDisposition(ContentDisposition.attachment().filename(filename).build());
        return ResponseEntity.ok().headers(headers).body(content);
    }

    private PageRequest pageRequest(int page, int size, String sort) {
        if (page < 0 || size < 1 || size > 10000) throw new IllegalArgumentException("Page hoac size khong hop le");
        String[] parts = sort.split(",", -1);
        if (parts.length != 2 || !SORT_FIELDS.contains(parts[0]) || !(parts[1].equalsIgnoreCase("asc") || parts[1].equalsIgnoreCase("desc"))) {
            throw new IllegalArgumentException("Sort khong hop le");
        }
        Sort.Direction direction = Sort.Direction.fromString(parts[1]);
        return PageRequest.of(page, size, Sort.by(direction, parts[0]));
    }
}
