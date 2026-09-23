INSERT INTO employees (
	employee_code, full_name, gender, date_of_birth, phone, email, address,
	department, position, hire_date, status, base_salary, note, created_at, updated_at
)
SELECT
	'E' || LPAD(CAST(x AS VARCHAR), 3, '0'),
	'Nhan vien mau ' || x,
	CASE WHEN MOD(x, 2) = 0 THEN 'FEMALE' ELSE 'MALE' END,
	DATEADD('YEAR', MOD(x, 12), DATE '1985-01-01'),
	'090' || LPAD(CAST(x AS VARCHAR), 7, '0'),
	'employee' || x || '@company.com',
	'Ha Noi',
	CASE MOD(x, 3) WHEN 0 THEN 'HR' WHEN 1 THEN 'IT' ELSE 'Finance' END,
	CASE WHEN MOD(x, 2) = 0 THEN 'Specialist' ELSE 'Developer' END,
	DATEADD('YEAR', MOD(x, 7), DATE '2018-01-01'),
	CASE MOD(x, 3) WHEN 0 THEN 'ACTIVE' WHEN 1 THEN 'INACTIVE' ELSE 'RESIGNED' END,
	12000000 + (x * 100000),
	'Du lieu mau',
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
FROM SYSTEM_RANGE(1, 50)
WHERE NOT EXISTS (SELECT 1 FROM employees);
