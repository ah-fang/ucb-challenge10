var Employee = require('./Employee.js');

class Engineer extends Employee {

    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
}

module.exports = Engineer;