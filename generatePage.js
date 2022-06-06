// // const generateProjects= empArr => {
// //   return `
// //     <section class="my-3" id="portfolio">
// //       <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
// //       <div class="flex-row justify-space-between">
// //         ${empArr
// //           .filter(({ feature }) => feature)
// //           .map(({ name, languages, link }) => {
// //             return `
// //             <div class="col-12 mb-2 bg-dark text-light p-3">
// //             <h3 class="portfolio-item-title text-light">${name}</h3>
// //             <h5 class="portfolio-languages">
// //               Built With:
// //               ${languages.map(language => language).join(", ")}
// //             </h5>
// //             <p>${description}</p>
// //             <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
// //           </div>
// //           `;
// //           })
// //           .join('')}

// //           ${empArr
// //             .filter(({feature}) => !feature)
// //             .map(({ name, description, languages, link }) => {
// //               return `
// //               <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
// //               <h3 class="portfolio-item-title text-light">${name}</h3>
// //               <h5 class="portfolio-languages">
// //                 Built With:
// //                 ${languages.join(", ")}
// //               </h5>
// //               <p>${description}</p>
// //               <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
// //             </div>
// //             `;
// //             })
// //             .join('')}
// //       </div>
// //     </section>
// //   `;
// // };

// //final function for export. Must call all above functions inside scope

// const generateCards = empArr => {
//   console.log("Got to the generate Cards function. Here's the array: ");
//   console.log(empArr);
// };

// const generatePage = empArr => {
//     console.log("This is the result before generatePage starts:")
//     console.log(empData);
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//         <link ref="stylesheet" src="./style.css">
//     </head>
//     <body>
//         <header>HEADER TEXT</header>

//         <div class = "container">${generateCards(empData)}FUNCTION TO FILL CARDS SECTION</div>
//     </body>
//     </html>`; 
// }


//DO THIS IN ONE FILE TO AVOID CIRCULAR DEPENDENCY
module.exports = empArr => {
    console.log(employees);
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
        <header>HEADER TEXT</header>

        <div class = "container">FUNCTION TO FILL CARDS SECTION</div>
    </body>
    </html>`; 
 }; 