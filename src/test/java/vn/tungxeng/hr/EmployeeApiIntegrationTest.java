package vn.tungxeng.hr;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Stream;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class EmployeeApiIntegrationTest {
    @Autowired MockMvc mvc;

    @ParameterizedTest(name = "BE-CTL-008 invalid query: {0}")
    @ValueSource(strings = {"page=-1", "size=0", "size=101", "sort=missing,asc", "page=abc"})
    void invalidQuery(String query) throws Exception {
        mvc.perform(get("/api/employees?" + query)).andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errorCode").value("EMP-400-001"));
    }

    @Test
    void invalidJsonDateIsClientError() throws Exception {
        mvc.perform(post("/api/employees").contentType("application/json")
            .content("{\"employeeCode\":\"TEST01\",\"fullName\":\"Test Name\",\"dateOfBirth\":\"2023-02-29\"}"))
            .andExpect(status().isBadRequest()).andExpect(jsonPath("$.errorCode").value("EMP-400-001"));
    }

    @ParameterizedTest(name = "BE-CTL-014 invalid create payload: {0}")
    @MethodSource("invalidCreatePayloads")
    void createRejectsInvalidPayloads(String payload) throws Exception {
        mvc.perform(post("/api/employees").contentType("application/json").content(payload))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errorCode").value("EMP-400-001"));
    }

    @Test
    void listMetadataAndExactCombinedFilters() throws Exception {
        mvc.perform(get("/api/employees")).andExpect(status().isOk())
            .andExpect(jsonPath("$.content.length()").value(10)).andExpect(jsonPath("$.totalElements").value(50))
            .andExpect(jsonPath("$.page").value(0)).andExpect(jsonPath("$.size").value(10))
            .andExpect(jsonPath("$.totalPages").value(5)).andExpect(jsonPath("$.sort").value("employeeCode,asc"));
        mvc.perform(get("/api/employees?employeeCode=e001&gender=FEMALE"))
            .andExpect(status().isOk()).andExpect(jsonPath("$.content.length()").value(0));
    }

    @Test
    void createAndDuplicateConflictFollowBusinessRule() throws Exception {
        String valid = "{\"employeeCode\":\"TEST01\",\"fullName\":\"Test Name\",\"gender\":\"MALE\",\"dateOfBirth\":\"1990-01-10\",\"phone\":\"0901234567\",\"email\":\"test@example.com\"}";
        mvc.perform(post("/api/employees").contentType("application/json").content(valid))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.employeeCode").value("TEST01"));

        mvc.perform(post("/api/employees").contentType("application/json").content(valid))
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$.errorCode").value("EMP-409-001"));
    }

    @Test
    void missingResources() throws Exception {
        mvc.perform(get("/api/employees/999999")).andExpect(status().isNotFound())
            .andExpect(jsonPath("$.errorCode").value("EMP-404-001"));
        mvc.perform(delete("/api/employees/999999")).andExpect(status().isNotFound())
            .andExpect(jsonPath("$.errorCode").value("EMP-404-001"));
    }

    @Test
    void emptyCsvHasOnlyBomAndHeader() throws Exception {
        mvc.perform(get("/api/employees/export/csv?employeeCode=ZZZ_NO_MATCH"))
            .andExpect(status().isOk()).andExpect(content().contentType("text/csv;charset=UTF-8"))
            .andExpect(header().exists("Content-Disposition"))
            .andExpect(content().string("\uFEFFemployeeCode,fullName,gender,dateOfBirth,phone,email\n"));
    }

    private static Stream<Arguments> invalidCreatePayloads() {
        return Stream.of(
            Arguments.of("{\"employeeCode\":\"\",\"fullName\":\"Valid Name\",\"gender\":\"MALE\",\"dateOfBirth\":\"1990-01-10\",\"phone\":\"0901234567\",\"email\":\"test@example.com\"}"),
            Arguments.of("{\"employeeCode\":\"TEST01\",\"fullName\":\"\",\"gender\":\"MALE\",\"dateOfBirth\":\"1990-01-10\",\"phone\":\"0901234567\",\"email\":\"test@example.com\"}"),
            Arguments.of("{\"employeeCode\":\"TEST01\",\"fullName\":\"Valid Name\",\"gender\":\"MALE\",\"dateOfBirth\":\"1990-01-10\",\"phone\":\"abc123\",\"email\":\"test@example.com\"}"),
            Arguments.of("{\"employeeCode\":\"TEST01\",\"fullName\":\"Valid Name\",\"gender\":\"MALE\",\"dateOfBirth\":\"1990-01-10\",\"phone\":\"0901234567\",\"email\":\"bad-email\"}"));
    }
}
