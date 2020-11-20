const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require( "./lib/Employee" );
const { log } = require( "console" );

let employeeArray = [];


// questions that will be asked of all employees
const employeeQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
    default: "No Name Given",
  },
  {
    type: "input",
    name: "id",
    message: "What is your ID number?",
    default: "No ID Given",
  },
  {
    type: "input",
    name: "email",
    message: "What is your E-mail address?",
    default: "No Email Given",
  },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


// function that prompts user for all questions other than new questions
const promptUser = (array) => {
  return inquirer.prompt(array).then((answers) => {
    return answers
  }).catch(error => console.error(error));
};

// functions for each employee based on what user selected. 
// Adds neccesary question calls above function. 
// fills constructor with information to push to array

const newManager = () => {
  employeeQuestions.push({
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
    default: "No Office Number Given",
  });
 
  promptUser(employeeQuestions).then((answers) => {
  console.log("answers", answers);
  const employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber, "Manager")
  employeeArray.push(employee)
  newEmployee()})
};

const newEngineer = () => {
  employeeQuestions.push({
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
    default: "No Username Given",
  });
  promptUser(employeeQuestions).then((answers) => {
  const employee = new Engineer(answers.name, answers.id, answers.email, answers.github, "Engineer")
  employeeArray.push(employee)
  newEmployee()})
};

const newIntern = () => {
  employeeQuestions.push({
    type: "input",
    name: "school",
    message: "What school do you attend?",
    default: "No School Given",
  });
  promptUser(employeeQuestions).then((answers) => {
  const employee = new Intern(answers.name, answers.id, answers.email, answers.school, "Intern")
  employeeArray.push(employee)
  newEmployee()})
};

const newEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "newEmployee",
        message: "Would you like to add another employee",
        choices: ["No", "Manager", "Engineer", "Intern"],
      },
    ])
    .then((answers) => {
      switch (answers.newEmployee) {
        case "Manager":
          newManager();
          break;
        case "Engineer":
          newEngineer();
          break;
        case "Intern":
          newIntern();
          break;
        default:
          renderTeam(employeeArray);
      }
    }).catch(error => console.error(error));
};


const renderTeam = (array) => {
    fs.writeFile(outputPath, render(array), function(){})
}


newEmployee();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
