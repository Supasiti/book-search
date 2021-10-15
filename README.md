# book-search

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![GraphQL](https://img.shields.io/badge/graphql-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![mongoDB](https://img.shields.io/badge/mongodb-white?style=for-the-badge&logo=mongodb&logoColor=47A248)
![Mongoose](https://img.shields.io/badge/mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white)


## <h2 id="description"> Description </h2>

A web application that allows user to search and save their favourite books. A user can create their account that will store their books saved. 
They can search for books to save on a separate page. Once clicked saved, the book is recorded in the database which can be viewed in the user's dashboard.

A full application was already provided. The task is to migate the application from using RESTful API to GraphQL. The final application is deployed on Heroku.

### <h3 id="preview"> Preview </h3>

The end product should resemble the mock-up provided below:

[![book search screenshot](./demo/screenshot.png)](https://supa-book-search.herokuapp.com)


## <h2 id="table-of-contents"> Table of Contents </h2>

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## <h2 id="installation"> Installation </h2>
[(Back to top)](#table-of-content)

If you would like to work on a copy of this web application, you can follow these steps to set it up.

### Step 1: Load and install all dependencies

To use this project, first clone the repo on your device using the commands below:

    git clone https://github.com/Supasiti/book-search.git

Then install all the required libraries by running the follow command

    npm run install 


### Step 2: Setting up MongoDB on Mongo Atlas

After installing all the dependencies, you would need to set up Mongo database. An instruction on how to set it up on Mongo Atlas can be found [here](https://www.mongodb.com). After setting up Mongo Atlas, you would need to set up your local environment variables. On the root folder, create and open `.env` file:

    book-search> touch .env
    book-search> open .env

In the `.env` file, enter all the following details:

    MONGODB_URI=mongodb+srv....


## <h2 id="usage"> Usage </h2>
[(Back to top)](#table-of-content)

The access point for the appliction is in the main folder. The application can be run locally by the following commands:

    cd ~/pathTo/book-search
    npm run dev

The main application is deployed in Heroku, [here](https://supa-book-search.herokuapp.com) 


## <h2 id="license"> License </h2>
[(Back to top)](#table-of-content)

Licensed under the [MIT](https://opensource.org/licenses/MIT) license.