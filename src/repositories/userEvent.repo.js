const prisma = require('../prisma/client')

async function exists(userId, eventId) {
    const record = await prisma.userEvent.findUnique({
        where: {
            userId_eventId: {
                userId, eventId
            }
        }
    })
    return !!record
}

async function createRegistration(userId, eventId) {
    return prisma.userEvent.create({
        data: {
            userId, eventId
        }
    })

}

async function findUserEventsByUserId(userId) {
    return prisma.userEvent.findMany({
        where: {
            userId
        },
        select: {
            event: {
                select: {
                    publicId: true,
                    title: true,
                    venue: true,
                    startsAt: true,
                    creator: {
                        select: {
                            firstName: true
                        }
                    }
                }
            }
        }
    })

}

async function findAttendeesByEventId(eventId) {
    return prisma.userEvent.findMany({
        where: {
            eventId
        },
        select: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        }
    })
}

module.exports = {
    exists,
    createRegistration,
    findUserEventsByUserId,
    findAttendeesByEventId
}