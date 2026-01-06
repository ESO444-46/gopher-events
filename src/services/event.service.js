const eventRepo = require('../repositories/event.repo')

async function createEvent(eventData) {
    return eventRepo.createEvent(eventData)
};

async function getEvents() {
    return eventRepo.getEvents()
}

async function getEventByPublicId(publicId) {
    return eventRepo.findEventByPublicId(publicId)
}

module.exports = { createEvent, getEvents, getEventByPublicId }