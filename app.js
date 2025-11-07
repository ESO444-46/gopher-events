require("dotenv/config");
const express = require('express');
const { studentSignupValidation, loginValidation } = require('./utils/validator');
const { PrismaClient } = require("@prisma/client")
const bcrypt = require('bcrypt')
const saltRounds = 10;


const prisma = new PrismaClient();
const app = express();


app.use(express.json());


/*
 * LOGIN ROUTE: POST /login
 * Purpose: Authenticates an existing user.
 * Input: { email, password }
 * Output: Success message and user details (email, names) or 'Incorrect credentials' error (401).
 * Logic: Validates input -> Finds user by email -> Compares plain password to stored hash (bcrypt.compare).
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const result = loginValidation(email, password)

    if (!result) return res.status(401).json({ success: false, message: 'Login Failed' })

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) return res.status(401).json({ success: false, message: 'Incorrect credentials' })

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) return res.status(401).json({ success: false, message: 'Incorrect credentials' })

    return res.status(200).json({
        success: true,
        message: 'Successfully logged in',
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    })
})


/*
 * SIGNUP ROUTE: POST /student/signup
 * Purpose: Registers a new student user and secures the password.
 * Input: { firstName, lastName, email, password }
 * Output: Success message and new user details (email, names) or error (400/404).
 * Logic: Validates input -> Checks for user existence -> Hashes password (bcrypt) -> Creates user in DB.
 */
app.post('/student/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    const result = studentSignupValidation(firstName, lastName, email, password)

    if (!result) {
        return res.json({ success: false, message: 'Registration Failed' })
    }

    const userExists = await prisma.user.findUnique({
        where: { email }
    })

    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await prisma.user.create({
        data: {
            firstName, lastName, email, password: hashedPassword
        }
    })

    return res.json({
        success: true, message: `Registered successfully`, user: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    })

})


module.exports = app;