package vn.tungxeng.hr.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponse(
        String errorCode,
        String message,
        List<FieldErrorDetail> details,
        String path,
        LocalDateTime timestamp,
        String correlationId
) {
    public record FieldErrorDetail(String field, Object rejectedValue, String reason) {
    }
}
