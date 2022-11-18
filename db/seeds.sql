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
('Ludwig', 'Beethoven', 1, null),
('Johann', 'Bach', 2, null),
('Wolfgang', 'Mozart', 3, null),
('Johannes', 'Brahms', 4, null),
('Richard', 'Wagner', 5, 1),
('Claude', 'Debussy', 6, null),
('Pyotr', 'Tchaikovsky', 7, null),
('Frederic', 'Chopin', 8, null);