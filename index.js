//Step 1: Requires 
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

//Step 2: Inquirer prompts
const promptManager = () => {

    console.log(`
    ==================
    
    Add a Team Manager 
    
    ===================`);
    return inquirer
    .prompt([
        {
           type:"input",
           name: "name",
           message: "Enter the name of the team manager",
           validate: nameInput => {
           if (nameInput) {
                   return true;
               } else {
                   console.log("Please enter the manager's name!");
                   return false;
               }
           } 
        },
        {
           type:"input",
           name: "id",
           message: "Enter the employee ID of the team manager",
           validate: nameInput => {
           if (nameInput) {
                   return true;
               } else {
                   console.log("Please enter the manager's ID!");
                   return false;
               }
           } 
        },
        {
            type:"input",
            name: "email",
            message: "Enter the team manager's email address",
            validate: nameInput => {
                if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter the manager's email!");
                        return false;
                    }
                } 
        },
        {
            type:"input",
            name: "office",
            message: "Enter the office number of the team manager",
            validate: nameInput => {
            if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a valid office number!");
                    return false;
                }
            }
        }
    ])
    .then(managerData => {
        const { name, id, email, office } = managerData;
        const manager = new Manager(name, id, email, office);
        employees.push(manager);
    })
};

const promptEmployeeInfo = () => {
        console.log(`
        ==================
        
        Add a New Team Member
        
        ===================`);
    return inquirer
    .prompt([
        {
            type: "list",
            name: "role",
            message: "What is this team member's role?",
            choices: ["Engineer", "Intern"],
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please select a role for this team member!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of the employee?(Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "What is their employee ID?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter an ID number!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Provide the employee's email address.",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter an employee email!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter the engineer's github username.",
            when: (answers) => answers.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a username!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Enter the name of the intern's school.",
            when: (answers) => answers.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter a school name!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "confirmAddEmployee",
            message: "Would you like to enter another team member?",
            default: false
        }
    ])
    .then(empData => {
        if(empData.role === 'Intern') {
            const { name, id, email, school } = empData;
            const intern = new Intern(name, id, email, school);
            employees.push(intern);
        }
        else {
            const { name, id, email, github } = empData;
            const engineer = new Engineer(name, id, email, github);
            employees.push(engineer); 
        }

        if(empData.confirmAddEmployee) {
            return promptEmployeeInfo(empData);
        } else {
            return employees;
        }
    });
}

//Step 3: format page html
const generatePage = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
    </head>
    <body>
        <header class="header bg-success text-center p-2">
            <h1>My Team<h1>
        </header>

        <div class = "container d-flex flex-wrap justify-content-center">
            ${employees
                .filter((employee) => employee instanceof Manager)
                .map((manager) => `
                    <div class="card col-12 col-md-5 col-lg-3 m-2 bg-dark p-3 flex-column">
                        <div class="card-header text-light">
                            <h3 class="text-light">${manager.name}</h3>
                            <h4>Manager</h4>
                        </div>
                        <div class="card-body bg-light">
                            <p>ID: ${manager.id}</p>
                            <p>Email: 
                                <a href="mailto:${manager.email}">${manager.email}</a>
                            </p>
                            <p>Office Number: ${manager.office}</p>
                        </div>
                    </div>`)}

            ${employees
                .filter((employee) => employee instanceof Engineer)
                .map((engineer) => `
                    <div class="card col-12 col-md-5 col-lg-3 m-2 bg-dark p-3 flex-column">
                            <div class="card-header text-light">
                                <h3 class="text-light">${engineer.name}</h3>
                                <h4>Engineer</h4>
                            </div>
                        <div class="card-body bg-light">
                            <p>ID: ${engineer.id}</p>
                            <p>Email: 
                                <a href="mailto:${engineer.email}">${engineer.email}</a>
                            </p>
                            <p>Github: 
                                <a href="https://github.com/${engineer.github}" class="mt-auto"><i class="fab fa-github mr-2"></i>${engineer.github}</a>
                            </p>
                        </div>
                    
                    </div>`)}

            ${employees
                .filter((employee) => employee instanceof Intern)
                .map((intern) => `
                    <div class="card col-12 col-md-5 col-lg-3 m-2 bg-dark p-3 flex-column">
                        <div class="card-header text-light">
                            <h3 class="text-light">${intern.name}</h3>
                            <h4>Intern</h4>
                        </div>
                        <div class="card-body bg-light">
                            <p>ID: ${intern.id}</p>
                            <p>Email: 
                                <a href="mailto:${intern.email}">${intern.email}</a>
                            </p>
                            <p>School: ${intern.school}</p>
                        </div>
                    </div>`)}

        </div>
    </body>
    </html>`; 
}

//Step 4: Create HTML file
const writeFile = (fileData) => {
    fs.writeFile('./dist/index.html', fileData, err => {
        if(err) {
            console.log(err);
            return;
        }
        console.log('Your page is ready to view!')
    });
}

//Step 5: init
function init() {
    promptManager()
        .then(promptEmployeeInfo)
            .then(() => {
                return generatePage()})
            .then(fileData => {
                writeFile(fileData);
            })
            .catch(err => {
                console.log(err);
            })
}

init();
