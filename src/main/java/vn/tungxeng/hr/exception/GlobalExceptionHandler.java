package vn.tungxeng.hr.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import vn.tungxeng.hr.dto.ErrorResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> validation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<ErrorResponse.FieldErrorDetail> details = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> new ErrorResponse.FieldErrorDetail(error.getField(), error.getRejectedValue(), error.getDefaultMessage()))
                .toList();
        return response(HttpStatus.BAD_REQUEST, "EMP-400-001", "Du lieu dau vao khong hop le", details, request);
    }

    @ExceptionHandler({BusinessException.class, IllegalArgumentException.class, MethodArgumentTypeMismatchException.class})
    ResponseEntity<ErrorResponse> badRequest(Exception ex, HttpServletRequest request) {
        String code = ex instanceof BusinessException && ex.getMessage().contains("Khoang ngay") ? "EMP-400-002" : "EMP-400-001";
        return response(HttpStatus.BAD_REQUEST, code, ex.getMessage(), List.of(), request);
    }

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ErrorResponse> notFound(NotFoundException ex, HttpServletRequest request) {
        return response(HttpStatus.NOT_FOUND, "EMP-404-001", ex.getMessage(), List.of(), request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<ErrorResponse> conflict(DataIntegrityViolationException ex, HttpServletRequest request) {
        return response(HttpStatus.CONFLICT, "EMP-409-001", "Du lieu nhan su bi trung hoac khong hop le", List.of(), request);
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ErrorResponse> serverError(Exception ex, HttpServletRequest request) {
        return response(HttpStatus.INTERNAL_SERVER_ERROR, "EMP-500-001", "Da xay ra loi he thong", List.of(), request);
    }

    private ResponseEntity<ErrorResponse> response(HttpStatus status, String code, String message,
                                                    List<ErrorResponse.FieldErrorDetail> details, HttpServletRequest request) {
        ErrorResponse body = new ErrorResponse(code, message, details, request.getRequestURI(), LocalDateTime.now(), UUID.randomUUID().toString());
        return ResponseEntity.status(status).body(body);
    }
}
