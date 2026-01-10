const { success } = require('zod')
const { event } = require('../prisma/client')
const eventRepo = require('../repositories/event.repo')
const userEventRepo = require('../repositories/userEvent.repo')

async function createEvent(eventData) {
    return eventRepo.createEvent(eventData)
};

async function getEvents() {
    return eventRepo.getEvents()
}

async function getEventByPublicId(publicId) {
    return eventRepo.findEventByPublicId(publicId)
}

async function registerUserForEvent({ userId, publicId }) {
    const event = await eventRepo.findByPublicId(publicId)

    if (!event) {
        const err = new Error('Event not found')
        err.code = 'EVENT_NOT_FOUND'
        throw err
    }

    const alreadyRegistered = await userEventRepo.exists(userId, event.id)

    if (alreadyRegistered) {
        const err = new Error('User already registered for this event')
        err.code = 'ALREADY_REGISTERED'
        throw err
    }
    try {
        return userEventRepo.createRegistration(userId, event.id)
    } catch (err) {
        if (err.code === 'P2002') {
            const e = new Error('User already registered for this event')
            e.code = 'ALREADY_REGISTERED'
            throw e
        }
        throw err
    }

}

async function getMyCreatedEvents(userId) {
    return eventRepo.findEventsByCreatorId(userId)
}

async function getEventAttendees(publicId, userId) {
    const event = await eventRepo.findByPublicIdAndCreatorId(publicId, userId)

    if (!event) {
        // TODO: replace with HttpError during error-handling refactor
        const err = new Error('Event not found')
        err.code = 'EVENT_NOT_FOUND'
        throw err
    }

    const rows = await userEventRepo.findAttendeesByEventId(event.id)
    return rows.map(r => r.user)
}

module.exports = {
    createEvent,
    getEvents,
    getEventByPublicId,
    registerUserForEvent,
    getMyCreatedEvents,
    getEventAttendees
}