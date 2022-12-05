// Includes packages needed for this application
const mysql = require('mysql');
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
                break;
            case 'Add Employee':
                break;
            case 'Update Employee Role':
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                connection.end();
                break;
        }
    })
}

function viewAllEmployees() {
    const query =
        `SELECT 
        employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON department.id = role.department_id
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    `;

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('Viewing All Employees\n');
        firstQuestion();
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
        console.log('Viewing All Roles\n');
        firstQuestion();
    })


}

function viewAllDepartments() {
    const query =
        `SELECT * FROM department`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('Viewing All Departments\n');
        firstQuestion();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
            validate: departmentInput => {
                if (departmentInput) {
                  return true;
                } else {
                  console.log("Please enter a department name.");
                  return false;
                }
              }
        }
    ]).then(answer => { //for inquirer the parameter has to be something which is an object here
        const query =
        `INSERT INTO department(department_name) VALUES('${answer.departmentName}');`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.table(res);
        console.log(`Department '${answer.departmentName}', successfully added as a department.\n`);
        firstQuestion();
    })
})
}

// Creates a function to initialize app
function init() {
    console.log('Welcome to the employee tracker!');
    firstQuestion();
}

// Function call to initialize app
init();