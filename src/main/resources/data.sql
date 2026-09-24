INSERT INTO employees (
	employee_code, full_name, gender, date_of_birth, phone, email
)
SELECT
	'E' || LPAD(CAST(x AS VARCHAR), 3, '0'),
	'Nhan vien mau ' || x,
	CASE WHEN MOD(x, 2) = 0 THEN 'FEMALE' ELSE 'MALE' END,
	DATEADD('YEAR', MOD(x, 12), DATE '1985-01-01'),
	'090' || LPAD(CAST(x AS VARCHAR), 7, '0'),
	'employee' || x || '@company.com'
FROM SYSTEM_RANGE(1, 50)
WHERE NOT EXISTS (SELECT 1 FROM employees);
