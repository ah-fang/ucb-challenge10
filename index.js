/*User Story:
AS A manager
I WANT to generate a webpage that displays my team's basic info
SO THAT I have quick access to their emails and GitHub profiles

GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
    - inquirer prompts 
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
    - Use fs (send html file to dist folder)
    
WHEN I click on an email address in the HTML
    - Generate email addresses as links 
THEN my default email program opens and populates the TO field of the email with the address
    - Use mailto 

WHEN I click on the GitHub username
    - Generate github link
THEN that GitHub profile opens in a new tab

WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number 

WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team

WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu

WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu

WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated

Unique Identifiers
    Manager: Office number
    Engineer: Github
    Intern: school

index js should contain:
1. 'require's
2. Inquirer prompts
3. WritetoFile function
4. init function & call
*/

//Step 1: Requires
//for writeToFile function(step 4) 
const fs = require('fs');
//to ask questions and save the answers(step 2) 
const inquirer = require('inquirer');

// //separate JS file to take returned data and print to html file
// const generatePage = require('./generatePage');

//validate email addresses so they generate valid links
const emailValidator = require('email-validator');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employees = [];

//////////////////////////////////////////////////////////////////////

//Step 2: Inquirer prompts
const promptManager = () => {

    console.log(`
    ==================
    
    Add a Team Manager 
    
    ===================`);
    return inquirer
    .prompt([
        {
            //manager name
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
           // manager ID
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
            //manager email
            type:"input",
            name: "email",
            message: "Enter the team manager's email address",
            // validate: emailValidator.validate(nameInput)
            // nameInput => {
            // if (nameInput) {
            //         return true;
            //     } else {
            //         console.log("Please enter the manager's email!");
            //         return false;
            //     }
            // } 
        },
        {
            //manager email
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
        //push Manager to employees array instead of managerData
        employees.push(manager);
    })
};

const promptEmployeeInfo = managerInfo => {
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
        //add conditionals to check if they answered Engineer or Intern
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
        console.log("Show employees Array on index file:");
        console.log(employees);

        if(empData.confirmAddEmployee) {
            return promptEmployeeInfo(empData);
        } else {
            return employees;
        }
    });
}
//////////////////////////////////////////////////////////////////////

//Step 3: format page html
const generateCards = () => {
//conditionally create the cards 
    //check if each index in the array is an instance of Engineer or Intern and return proper HTML
    // const engineers = employees.filter((employee) => employee instanceof Engineer).map((engineer) => {return`
    // <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    // <h3 class="portfolio-item-title text-light">${engineer.name}</h3>

    // <p>${engineer.id}</p>
    // <p>${engineer.email}</p>
    // <p>${engineer.github}</p>
    // <a href="${engineer.github}.github.io" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View GitHub Profile</a>
    // </div>
    // `});
    const engineersList = employees.filter((employee) => employee instanceof Engineer);
    const engineersHtml = engineersList.map((engineer) => `
        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
        <h3 class="portfolio-item-title text-light">${engineer.name}</h3>

        <p>${engineer.id}</p>
        <p>${engineer.email}</p>
        <p>${engineer.github}</p>
        <a href="${engineer.github}.github.io" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View GitHub Profile</a>
        </div>`);
    const engineersString = engineersHtml.reduce((acc, engineer) => `${acc} ${engineer}`, '');  
    return engineersString;

};

const generatePage = () => {
    console.log('generate page is running');
    console.log(employees);
    console.log("This is the second string");
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link ref="stylesheet" src="./style.css">
    </head>
    <body>
        <header>My Team</header>

        <div class = "container">
            ${employees
                .filter((employee) => employee instanceof Manager)
                .map((manager) => `
                    <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                        <h3 class="portfolio-item-title text-light">${manager.name}</h3>
                        <h4>Manager</h4>
                        <p>ID: ${manager.id}</p>
                        <a href="mailto:${manager.email}">Email: ${manager.email}</a>
                        <p>Office Number: ${manager.office}</p>
                    </div>`)}

            ${employees
                .filter((employee) => employee instanceof Engineer)
                .map((engineer) => `
                    <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                        <h3 class="portfolio-item-title text-light">${engineer.name}</h3>
                        <h4>Engineer</h4>
                        <p>ID: ${engineer.id}</p>
                        <a href="mailto:${engineer.email}">Email: ${engineer.email}</p>
                        <a href="github.com/${engineer.github}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>GitHub</a>
                    </div>`)}

            ${employees
                .filter((employee) => employee instanceof Intern)
                .map((intern) => `
                    <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                        <h3 class="portfolio-item-title text-light">${intern.name}</h3>
                        <h4>Intern</h4>
                        <p>ID: ${intern.id}</p>
                        <a href="mailto:${intern.email}">Email: ${intern.email}</p>
                        <p>Office Number: ${intern.school}</p>
                    </div>`)}
        </div>
    </body>
    </html>`; 
}

//////////////////////////////////////////////////////////////////////

//Step 4: writeToFile function
const writeToFile = (fileData) => {
    fs.writeFile('./dist/index.html', fileData, err => {
        if(err) {
            console.log(err);
            return;
        }
        console.log('Your page is ready to view!')
    });
}

//////////////////////////////////////////////////////////////////////

//Step 5: init
function init() {
    promptManager()
        .then(promptEmployeeInfo)
            .then(() => {
                return generatePage()})
            .then(fileData => {
                writeToFile(fileData);
            })
            .catch(err => {
                console.log(err);
            })
}


init();

// function init() {
//     promptManager()
//         .then(promptEmployeeInfo)
//         .then(empArr => {
//             return generatePage(empArr)})
//         .then(fileData => {
//             writeToFile(fileData);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

/*
${employees
    .filter(({  }) => Manager)
    .map(({ name, id, email, office }) => {
        return `
        <div class="col-12 mb-2 bg-dark text-light p-3">
        <h3 class="portfolio-item-title text-light">${name}</h3>

        <p>${id}</p>
        <p>${email}</p>
        <p>${office}</p>
    </div>
    `;
    })
    .join('')}
    
    ${employees
        .filter(function getEngineer() {

        })
        .map(({ name, id, email, github }) => {
        return `
        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
        <h3 class="portfolio-item-title text-light">${name}</h3>

        <p>${id}</p>
        <p>${email}</p>
        <p>${github}</p>
        <a href="${github}.github.io" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View GitHub Profile</a>
        </div>
        `;
        })
        .join('')}
        
        ${employees
        .filter(({  }) => Intern)
        .map(({ name, id, email, school }) => {
            return `
            <div class="col-12 mb-2 bg-dark text-light p-3">
            <h3 class="portfolio-item-title text-light">${name}</h3>

            <p>${id}</p>
            <p>${email}</p>
            <p>${school}</p>
        </div>
        `;
    })
    .join('')} */

        // for (let i = 0; i < employees.length; i++) {
    //     if(employees[i] instanceof Engineer) {
    //         let { name, id, email, github } = Engineer;
    //         cardHTML += `
    //         <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    //         <h3 class="portfolio-item-title text-light">${name}</h3>
    
    //         <p>${id}</p>
    //         <p>${email}</p>
    //         <a href="${github}.github.io" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View GitHub Profile</a>
    //         </div>
    //         `;
    //     } else if (employees[i] instanceof Intern) {
    //         let { name, id, email, school } = Intern;
    //         cardHTML += `
    //         <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    //         <h3 class="portfolio-item-title text-light">${name}</h3>

    //         <p>${id}</p>
    //         <p>${email}</p>
    //         <p>${school}</p>
    //         </div>
    //         `;
    //     } else {
    //         let { name, id, email, office } = Manager;
    //          `
    //         <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
    //         <h3 class="portfolio-item-title text-light">${name}</h3>

    //         <p>${id}</p>
    //         <p>${email}</p>
    //         <p>${office}</p>
    //         </div>
    //         `;

    //     }
    //     return cardHTML;
    // }