package vn.tungxeng.hr.dto;

import java.util.List;

public record EmployeeListResponse(
        List<EmployeeResponse> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        String sort
) {
}
