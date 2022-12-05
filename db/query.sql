-- Add your code below and execute file in MySQL Shell --
SELECT role.id, role.title, department.department_name AS department, role.salary
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON department.id = role.department_id;
