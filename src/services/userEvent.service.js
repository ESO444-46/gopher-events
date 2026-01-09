const { event } = require('../prisma/client')
const userEventRepo = require('../repositories/userEvent.repo')

async function getMyRegisteredEvents(userId) {
    const rows = await userEventRepo.findUserEventsByUserId(userId)
    return rows.map(r => r.event)
}


module.exports = {
    getMyRegisteredEvents
}