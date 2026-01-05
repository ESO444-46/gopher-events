const eventRepo = require('../repositories/event.repo')

async function createEvent(eventData) {
    return eventRepo.createEvent(eventData)
};

async function getEvents() {
    return eventRepo.getEvents()
}

module.exports = { createEvent, getEvents }