INSERT INTO department (id, department_name)
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Electrical Engineer I', 80000, 1),
       (2, 'Lead Electrical Engineer', 120000, 1),
       (3, 'Finance Analyst', 85000, 2),
       (4, 'Financial Development Manager', 185000, 2),
       (5, 'Criminal Lawyer', 125000, 3),
       (6, 'Law Office Manager', 225000, 3),
       (7, 'Sales Representative', 55000, 4),
       (8, 'Co-Executive Officer', 300000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Brenn', 'Rethral', 8, null),
       (2, 'Franco', 'Sanchez', 2, 1),
       (3, 'Lily', 'Fredrick', 4, 1),
       (4, 'Denise', 'Newmann', 6, 1),
       (5, 'Cody', 'Coldhart', 5, 4),
       (6, 'Reneth', 'Peter', 1, 2),
       (7, 'Katrina', 'White', 7, 1),
       (8, 'Zelda', 'Tyler', 3, 3);
       
       

