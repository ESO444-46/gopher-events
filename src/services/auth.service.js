const userRepo = require('../repositories/user.repo');
const bcrypt = require('bcrypt')
const saltRounds = 10
const utils = require('../utils/auth.utils')

async function signup(userData) {
    const { firstName, lastName, email, password } = userData

    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
        throw new Error('Email already registered')
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const createdUser = await userRepo.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    return {
        id: createdUser.id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        createdAt: createdUser.createdAt,
    };

}



async function login(userData) {
    const { email, password } = userData

    const user = await userRepo.findByEmail(email)

    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const accessToken = utils.generateAccessToken({
        userId: user.id,
        email: user.email
    })

    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        },
        accessToken
    }
}



module.exports = {
    signup,
    login
}

