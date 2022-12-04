INSERT INTO department (id, department_name)
VALUES (001, 'Engineering'),
       (002, 'Finance'),
       (003, 'Legal'),
       (004, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES (001, 'Maintenance Technician II', 80000, 2),
       (002, 'Design Engineer II', 150000, 2),
       (003, 'Finance Analyst', 85000, 3),
       (004, 'Criminal Lawyer', 125000, 4),
       (005, 'Sales Representative', 55000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, 'Yigit', 'Ocak', 2, null),
       (002, 'Utku', 'Suicmez', 2, null),
       (003, 'Murat', 'Muratoglu', 3, null),
       (004, 'Iremnaz', 'Evli', 4, null),
       (005, 'Ceren', 'Comert', 1, null);
       

