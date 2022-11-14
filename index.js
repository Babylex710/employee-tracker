const inquirer = require('inquirer');
const db = require('./db/connection');
const utils = require('util');
const logo = require('asciiart-logo');
const { allowedNodeEnvironmentFlags } = require('process');
require('console.table');
db.query = utils.promisify(db.query);

function init() {
    const logoText = logo({ name: 'Employee Manager' }).render();

    console.log(logoText);
}

function startApp() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Quit',
            ],
        },
        ])
        .then((options) => {
            switch (options.choice) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'Add Employee':
                    addEmployees();
                    break;

                case 'Update Employee Role':
                    updateEmployee();
                    break;

                case 'View All Roles':
                    viewRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'View All Departments':
                    viewDept();
                    break;

                default:
                    process.exit();
            }
        });
}



function viewAllEmployees() {
    db.query(`SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS "department", role.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id LEFT JOIN employee manager on manager.id = employee.manager_id`
    ).then((result, err) => {
        if (err) console.error(err);
        console.table(result);
        startApp();
    });
}