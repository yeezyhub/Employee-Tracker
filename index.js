// Includes packages needed for this application
const mysql = require('mysql');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ilovechickenpizza',
    database: 'employeesDb'
});

// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;

    console.log("\n Welcome to the Employee Tracker! \n");
    firstQuestion();
});

function firstQuestion() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'], //prompts user to select between options
        }
    ]).then(choice => { //for inquirer the parameter has to be something which is an object here

        switch (choice.firstQuestion) {
            case 'View All Employees':
                viewAllEmployees();
                firstQuestion();
                break;
            case 'Add Employee':
                break;
            case 'Update Employee Role':
                break;
            case 'View All Roles':
                viewAllRoles();
                firstQuestion();
                break;
            case 'Add Role':
                break;
            case 'View All Departments':
                viewAllDepartments();
                firstQuestion();
                break;
            case 'Add Department':
                break;
            case 'Quit':
                break;
        }
    })
}

function viewAllEmployees() {
    const query =
        `SELECT 
        employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, NULL AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON department.id = role.department_id
    `;

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function viewAllRoles() {
    const query =
        `SELECT role.id, role.title, department.department_name AS department, role.salary
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON department.id = role.department_id`

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function viewAllDepartments() {
    const query =
        `SELECT * FROM department`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

// Creates a function to initialize app
function init() {
    console.log('Welcome to the employee tracker!');
    firstQuestion();
}

// Function call to initialize app
init();