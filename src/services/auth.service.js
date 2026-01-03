const userRepo = require('../repositories/user.repo');
const bcrypt = require('bcrypt')
const saltRounds = 10

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




module.exports = {
    signup,
}

