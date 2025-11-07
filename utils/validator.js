const validator = require('validator');

const isValidUmnEmail = function (email) {
    if (!validator.isEmail(email)) {
        return false;
    }
    return email.toLowerCase().endsWith('umn.edu');
};


const loginValidation = function (email, password) {
    if (!email || !password || password.length < 6) {
        return false;
    }

    return isValidUmnEmail(email);
};


const studentSignupValidation = function (firstName, lastName, email, password) {
    if (!firstName || !lastName || !email || !password || password.length < 6) {
        return false;
    }

    return isValidUmnEmail(email);
};


module.exports = { studentSignupValidation, loginValidation };