const prisma = require('../prisma/client')

function findByEmail(email) {
    return prisma.user.findUnique({
        where: { email }
    })
}


function createUser(data) {
    return prisma.user.create({
        data
    })
}

module.exports = {
    findByEmail, createUser
}