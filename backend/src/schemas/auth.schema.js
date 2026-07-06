const z = require('zod')

const signupSchema = z.object({
    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(30, 'First name is too long'),

    lastName: z
        .string()
        .min(1, 'lastname is required')
        .max(30, 'lastname is to long'),

    email: z
        .email('Invalid email formart')
        .endsWith('@umn.edu', 'Email must end with @umn.edu'),

    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'password is too long')
})

const loginSchema = z.object({
    email: z
        .email('Invalid email formart')
        .endsWith('@umn.edu', 'Email must end with @umn.edu'),

    password: z
        .string()
        .min(1, 'Password is required')
})

const otpSchema = z.object({
    email: z
        .email('Invalid email formart')
        .endsWith('@umn.edu', 'Email must end with @umn.edu'),

    otpCode: z.string("OTP code is required")
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^[0-9]+$/, "OTP must only contain numbers")
})

module.exports = {
    signupSchema,
    loginSchema,
    otpSchema
}