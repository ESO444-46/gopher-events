const prisma = require('../prisma/client')


async function createEvent(eventData) {
    return prisma.event.create({
        data: {
            title: eventData.title,
            description: eventData.description,
            venue: eventData.venue,
            startsAt: new Date(eventData.startsAt),
            endsAt: eventData.endsAt ? new Date(eventData.endsAt) : undefined,
            creatorId: eventData.creatorId
        }
        , select: {
            publicId: true,
            title: true,
            creator: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}


async function getEvents() {
    return prisma.event.findMany({
        where: {
            startsAt: {
                gte: new Date()
            }
        },
        orderBy: {
            startsAt: 'asc'
        },
        select: {
            publicId: true,
            title: true,
            venue: true,
            startsAt: true,
            creator: {
                select: {
                    firstName: true,
                }
            }
        }
    })
}

async function findEventByPublicId(publicId) {
    return prisma.event.findUnique({
        where: {
            publicId: publicId
        },
        select: {
            publicId: true,
            title: true,
            description: true,
            venue: true,
            startsAt: true,
            endsAt: true,
            createdAt: true,
            creator: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}


module.exports = {
    createEvent, getEvents, findEventByPublicId
};