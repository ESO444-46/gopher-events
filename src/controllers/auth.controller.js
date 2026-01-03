const authService = require('../services/auth.service')
const { signupSchema, loginSchema } = require('../schemas/auth.schema');
const { success } = require('zod');

async function signup(req, res) {

    const result = signupSchema.safeParse(req.body);


    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.flatten().fieldErrors
        })
    }
    const validatedData = result.data

    try {
        const user = await authService.signup(validatedData);

        return res.status(201).json({
            success: true,
            message: 'Signup successfull',
            user,
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}


async function login(req, res) {

    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.flatten().fieldErrors
        })
    }

    const validatedData = result.data

    try {
        const result = await authService.login(validatedData)

        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        })

    } catch (error) {
        if (error.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }

}

module.exports = {
    signup,
    login
}