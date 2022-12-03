// Includes packages needed for this application
const mysql = require("mysql");
const mysql2 = require("mysql2");
const inquirer = require('inquirer');
const consoleTable = require("console.table");

const questions = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'], //prompts user to select between options
        }
    ]).then(choice => { //for inquirer the parameter has to be something which is an object here
        // if (choice.firstQuestion === 'Engineer') {
        //     engineerQuestions();
        // } else if (choice.firstQuestion === 'Intern') {
        //     internQuestions();
        // } else if (choice.firstQuestion === 'I do not want to add more team members') {
        // }

        switch (choice.firstQuestion) {
            case 'View All Employees':
                break;
            case 'Add Employee':
                break;
            case 'Update Employee Role':
                break;
            case 'View All Roles':
                break;
            case 'Add Role':
                break;
            case 'View All Departments':
                break;
            case 'Add Department':
                break;
            case 'Quit':
                break;
        }
    })
}

// Creates a function to initialize app
function init() {
    console.log('Welcome to the employee tracker!');
    questions();
}

// Function call to initialize app
init();