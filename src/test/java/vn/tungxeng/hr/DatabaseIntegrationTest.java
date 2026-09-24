package vn.tungxeng.hr;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.UUID;
import static org.assertj.core.api.Assertions.*;

class DatabaseIntegrationTest {
    Connection connection;
    @BeforeEach void setup() throws Exception {
        connection = DriverManager.getConnection("jdbc:h2:mem:" + UUID.randomUUID(), "sa", "");
        ScriptUtils.executeSqlScript(connection, new ClassPathResource("schema.sql"));
    }
    @AfterEach void close() throws Exception { connection.close(); }
    void execute(String sql) throws SQLException {
        try (var statement = connection.createStatement()) { statement.execute(sql); }
    }
    int count() throws SQLException {
        try (var statement = connection.createStatement(); var rows = statement.executeQuery("SELECT COUNT(*) FROM employees")) {
            rows.next(); return rows.getInt(1);
        }
    }
    void seed() { ScriptUtils.executeSqlScript(connection, new ClassPathResource("data.sql")); }

    @Test void DB_SEED_001_002_fiftyRowsAndIdempotency() throws Exception {
        seed(); assertThat(count()).isEqualTo(50);
        seed(); assertThat(count()).isEqualTo(50);
    }
    @Test void DB_SEED_003_businessRowPreventsDemoSeed() throws Exception {
        execute("INSERT INTO employees(employee_code, full_name) VALUES ('BUS01', 'Business Employee')");
        seed(); assertThat(count()).isEqualTo(1);
    }
    @Test void DB_SCH_004_005_uniqueAndRequiredFields() throws Exception {
        execute("INSERT INTO employees(employee_code, full_name) VALUES ('DB001', 'Valid Name')");
        assertThatThrownBy(() -> execute("INSERT INTO employees(employee_code, full_name) VALUES ('DB001', 'Duplicate')"))
            .isInstanceOf(SQLException.class);
        assertThatThrownBy(() -> execute("INSERT INTO employees(full_name) VALUES ('Missing Code')"))
            .isInstanceOf(SQLException.class);
        assertThatThrownBy(() -> execute("INSERT INTO employees(employee_code) VALUES ('DB002')"))
            .isInstanceOf(SQLException.class);
        assertThat(count()).isEqualTo(1);
    }
    @Test void DB_TXN_001_002_003_004_commitRollbackDeleteAndConflict() throws Exception {
        connection.setAutoCommit(false);
        execute("INSERT INTO employees(employee_code, full_name) VALUES ('DB001', 'Valid Name')");
        connection.commit(); assertThat(count()).isEqualTo(1);
        execute("INSERT INTO employees(employee_code, full_name) VALUES ('DB002', 'Rollback Name')");
        assertThatThrownBy(() -> execute("INSERT INTO employees(employee_code, full_name) VALUES ('DB001', 'Duplicate')"))
            .isInstanceOf(SQLException.class);
        connection.rollback(); assertThat(count()).isEqualTo(1);
        execute("DELETE FROM employees WHERE employee_code='DB001'");
        connection.commit(); assertThat(count()).isZero();
    }
}
