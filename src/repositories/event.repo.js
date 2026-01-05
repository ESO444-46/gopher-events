const prisma = require('../prisma/client')


async function createEvent(eventData) {
    return await prisma.event.create({
        data: {
            title: eventData.title,
            description: eventData.description,
            venue: eventData.venue,
            startsAt: new Date(eventData.startsAt),
            endsAt: eventData.endsAt ? new Date(eventData.endsAt) : undefined,
            creatorId: eventData.creatorId
        }
        , include: {
            creator: {
                select: {
                    firstName: true,
                    lastName: true,
                }
            }
        }
    })
}

module.exports = {
    createEvent,
};