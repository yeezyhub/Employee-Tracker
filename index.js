// Includes packages needed for this application
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

//setting up the global variables
let departmentsArray = [];
let rolesArray = [];
let managersArray = [];
let employeeId;
let roleId;
let departmentId;
let roles = [];
let managers = [];
let employees = [];
let departments = [];
let employeesArray = [];

// create the connection to database
const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ilovechickenpizza',
    database: 'employeesDb'
});

// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;
});

//first question prompt
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
                getRoleAndManager();
                break;
            case 'Update Employee Role':
                getEmployeeAndRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                getDepartment();
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

//View All Employees
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

//View All Roles
function viewAllRoles() {
    const query =
        `SELECT role.id, role.title, department.department_name AS department, role.salary 
        FROM role
        LEFT JOIN department ON department.id = role.department_id`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log('Viewing All Roles\n');
        firstQuestion();
    })
}

//View All Departments
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

//Add Department
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
        },
    ]).then(answer => { //for inquirer the parameter has to be something which is an object here
        const query =
            `INSERT INTO department(department_name) VALUES('${answer.departmentName}');`;

        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log(`'${answer.departmentName}' is successfully added as a department.\n`);
            firstQuestion();
        })
    })
}

//getDepartment() to help adding roles
function getDepartment() {
    const query =
        `SELECT * FROM department;`;

    connection.query(query, function (err, res) {
        if (err) throw err;
        departmentsArray = Object.values(JSON.parse(JSON.stringify(res)));

        for (let i = 0; i < res.length; i++) {
            departmentsArray[i] = res[i].department_name;
            departments[i] = res[i];
        }

        return addRole(departmentsArray, departments);
    })
}

//Add Role
function addRole(departmentsArray, departments) {

    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log("Please enter a role name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of the role?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log("Please enter a salary.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: `Which department does the role belong to?`,
            choices: departmentsArray,
        }
    ]).then(answer => { //for inquirer the parameter has to be something which is an object here

        for (i = 0; i < departments.length; i++) {
            if (answer.roleDepartment == departments[i].department_name) {
                departmentId = departments[i].id;
            }
        }

        const query =
            `INSERT INTO role(title, salary, department_id) VALUES('${answer.roleName}', '${answer.roleSalary}', '${departmentId}');`;

        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log(`'${answer.roleName}' with salary of '${answer.roleSalary}' is successfully added as a role in the '${answer.roleDepartment}' department.\n`);
            firstQuestion();
        })
    })
}

//getRoleAndManager() to help adding employee
function getRoleAndManager() {

    // let departmentId;

    const query1 =
        `SELECT * FROM role;`;

    connection.query(query1, function (err, res) {
        if (err) throw err;
        rolesArray = Object.values(JSON.parse(JSON.stringify(res)));
        
        for (let i = 0; i < res.length; i++) {
            rolesArray[i] = res[i].title;
            roles[i] = res[i];
        }

    })

    const query2 =
        `SELECT * FROM employee;`;

    connection.query(query2, function (err, res) {
        if (err) throw err;
        managersArray = Object.values(JSON.parse(JSON.stringify(res)));

        for (let i = 0; i < res.length; i++) {
            managers[i] = { name: res[i].first_name + ' ' + res[i].last_name, value: res[i].id };
        }
        return addEmployee(rolesArray, managersArray, roles, managers);
    })
}

//Add Employee
function addEmployee(rolesArray, managersArray, roles, managers) {

    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the first name of the employee?',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Please enter the first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the last name of the employee?',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter the last name.");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: `What is the employee's role?`,
            choices: rolesArray
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: `Who is the employee's manager?`,
            choices: [...managers, { name: 'No Manager', value: null }]
        }
    ]).then(answer => { //for inquirer the parameter has to be something which is an object here

        for (i = 0; i < roles.length; i++) {
            if (answer.employeeRole == roles[i].title) {
                roleId = roles[i].id;
            }
        }

        managerId = answer.employeeManager;

        const query =
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;


        connection.query(query, [answer.employeeFirstName, answer.employeeLastName, roleId, managerId], function (err, res) {
            if (err) throw err;
            console.log(`'${answer.employeeFirstName} ${answer.employeeLastName}' as '${answer.employeeRole}' is successfully added.\n`);
            firstQuestion();
        })
    })
}

//getEmployeeAndRole() to help updating employee role
function getEmployeeAndRole() {

    const query1 =
        `SELECT * FROM employee;`;

    connection.query(query1, function (err, res) {
        if (err) throw err;
        employeesArray = Object.values(JSON.parse(JSON.stringify(res)));

        for (let i = 0; i < res.length; i++) {
            employeesArray[i] = res[i].first_name + ' ' + res[i].last_name;
            employees[i] = res[i];
        }

    })

    const query2 =
        `SELECT * FROM role;`;

    connection.query(query2, function (err, res) {
        if (err) throw err;
        rolesArray = Object.values(JSON.parse(JSON.stringify(res)));

        for (let i = 0; i < res.length; i++) {
            rolesArray[i] = res[i].title;
            roles[i] = res[i];
        }

        return updateEmployeeRole(employeesArray, rolesArray, employees, roles);
    })

}

//Update Employee Role
function updateEmployeeRole(employeesArray, rolesArray, employees, roles) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeName',
            message: `Which employee's role do you want to update?`,
            choices: employeesArray
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: `Which role do you want to assign the selected employee?`,
            choices: rolesArray
        }
    ]).then(answer => { //for inquirer the parameter has to be something which is an object here

        for (i = 0; i < employees.length; i++) {
            if (answer.employeeName == employeesArray[i]) {
                employeeId = employees[i].id;
            }
        }

        for (i = 0; i < roles.length; i++) {
            if (answer.employeeRole == roles[i].title) {
                roleId = roles[i].id;
            }
        }

        const query =
            `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`;

        connection.query(query, function (err, res) {
            if (err) throw err;
            console.log(`'${answer.employeeName}'s role is successfully updated to '${answer.employeeRole}'.\n`);
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