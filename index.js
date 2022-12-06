//Dependencies
const inquirer = require("inquirer");
const db = require("./db/connection");
require("console.table");
const utils = require("util");
db.query = utils.promisify(db.query);
const logo = require("asciiart-logo");

// Displays logo and load main prompts
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);
}

// Function to start application
function startApp() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    "View_All_Employees",
                    "Add_Employee",
                    "Update_Employee_Role",
                    "View_All_Roles",
                    "Add_Role",
                    "View_All_Departments",
                    "Add_Department",
                    "Quit",
                ],
            },
        ])
        .then((options) => {
            switch (options.choice) {
                case "View_All_Employees":
                    viewAllEmployees();
                    break;

                case "Add_Employee":
                    addEmployees();
                    break;

                case "Update_Employee_Role":
                    updateEmployee();
                    break;

                case "View_All_Roles":
                    viewRoles();
                    break;

                case "Add_Role":
                    addRole();
                    break;

                case "View_All_Departments":
                    viewDept();
                    break;

                case "Add_Department":
                    addDepartment();
                    break;

                default:
                    process.exit();
            }
        });
}

// Shows employee data
function viewAllEmployees() {
    db.query(
        `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS "department", role.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`
    ).then((result, err) => {
        if (err) console.error(err);
        console.table(result);
        startApp();
    });
}

// Prompt the enter the employee's information
function addEmployees() {
    inquirer.
        prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
            },
        ])
        .then((answer) => {
            const firstName = answer.first_name;
            const lastName = answer.last_name;
            db.query("SELECT role.id, role.title FROM role").then((result, err) => {
                if (err) console.error(err);
                const roleChoices = result.map(({ id, title }) => ({
                    value: id,
                    name: title,
                }));
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "role",
                            message: "What is the role of the employee",
                            choices: roleChoices,
                        },
                    ])
                    .then((answer) => {
                        const roleChoice = answer.role;
                        db.query(
                            "SELECT employee.first_name, employee.last_name, employee.id FROM employee"
                        ).then((result, err) => {
                            if (err) console.error(err);
                            const employee = result.map(({ id, first_name, last_name }) => ({
                                value: id,
                                name: `${first_name} ${last_name}`,
                            }));
                            inquirer
                                .prompt([
                                    {
                                        type: "list",
                                        name: "manager",
                                        message: "Who is the employee's manager",
                                        choices: employee,
                                    },
                                ])
                                .then((answer) => {
                                    db.query(
                                        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                                        [firstName, lastName, roleChoice, answer.manager]
                                    ).then((result, err) => {
                                        if (err) console.error(err);
                                        console.log("Added new employee");
                                        startApp();
                                    });
                                });
                        });
                    });
            });
        });
}

// Prompt to update employee information
function updateEmployee() {
    db.query("SELECT * FROM employee").then((result, err) => {
        if (err) console.log(err);
        const employee = result.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`,
        }));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Which employee would you like to update?",
                    choices: employee,
                },
            ])
            .then((answer) => {
                let employeeID = answer.employee_id;
                db.query("SELECT role.id, role.title FROM role").then((result, err) => {
                    if (err) console.log(err);
                    const roleChoices = result.map(({ id, title }) => ({
                        value: id,
                        name: title,
                    }));
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "role_id",
                                message: "Which role would you like to update?",
                                choices: roleChoices,
                            },
                        ])
                        .then((answer) => {
                            db.query(
                                "UPDATE employee SET role_id = ? WHERE id = ?",
                                [answer.role_id, employeeID],
                                (err, result) => {
                                    if (err) console.log(err);
                                    console.log("Employee updated");
                                    startApp();
                                }
                            );
                        });
                });
            });
    });
}

// displays job title, role id, department, and salary 
function viewRoles() {
    db.query(
        "SELECT role.id, role.title, role.salary FROM role LEFT JOIN department ON role.department_id = department.id"
    ).then((result, err) => {
        if (err) console.error(err);
        console.table(result);
        startApp();
    });
}

// Prompt to enter the name, salary, and department 
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "role_name",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
            },
        ])
        .then((answer) => {
            const roleName = answer.role_name;
            const salary = answer.salary;
            db.query("SELECT department.id, department.name FROM department").then(
                (result, err) => {
                    if (err) console.error(err);
                    const deptChoice = result.map(({ id, name }) => ({
                        value: id,
                        name: name,
                    }));
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "department",
                                message: "Which department does the role belong to?",
                                choices: deptChoice,
                            },
                        ])
                        .then((answer) => {
                            db.query(
                                "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                                [roleName, salary, answer.department]
                            ).then((result, err) => {
                                if (err) console.error(err);
                                console.log("Added new role");
                                startApp();
                            });
                        });
                }
            );
        });
}

// displays department names and ids
function viewDept() {
    db.query("SELECT * FROM department").then((result, err) => {
        if (err) console.error(err);
        console.table(result);
        startApp();
    });
}

// Prompt to enter the name of the department 
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "new_department",
                message: "What is the name of the department?",
            },
        ])
        .then((answer) => {
            db.query(
                "INSERT INTO department (name) VALUES (?)",
                answer.new_department
            ).then((result, err) => {
                if (err) console.error(err);
                startApp();
            });
        });
}

init();
startApp();