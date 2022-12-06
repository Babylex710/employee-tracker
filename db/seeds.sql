INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Phelps', 'Nathalie', 1, null),
('Woods', 'Jacob', 2, null),
('Gonzalez', 'Robert', 3, null),
('Johannes', 'Sherry', 4, null),
('Steele', 'Richard', 5, 1),
('Lewis', 'Kyle', 6, null),
('Newman', 'Tom', 7, null),
('Frederics', 'Justin', 8, null);