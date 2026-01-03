const authService = require('../services/auth.service')
const { signupSchema } = require('../schemas/auth.schema')

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

module.exports = {
    signup
}