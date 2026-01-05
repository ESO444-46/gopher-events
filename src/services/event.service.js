const eventRepo = require('../repositories/event.repo')

async function createEvent(eventData) {
    return await eventRepo.createEvent(eventData)
};

module.exports = { createEvent }