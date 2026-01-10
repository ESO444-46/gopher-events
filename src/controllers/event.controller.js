const { success } = require('zod')
const eventSchema = require('../schemas/event.schema')
const eventService = require('../services/event.service')
const userService = require('../services/userEvent.service')

async function createEvent(req, res) {
    const result = eventSchema.createEvent.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.flatten().fieldErrors
        })
    }

    const validatedData = {
        ...result.data,
        creatorId: req.user.userId
    }

    try {
        const event = await eventService.createEvent(validatedData)

        return res.status(201).json({
            success: true,
            event
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error in creating event'
        })
    }
}


async function getEvents(req, res) {
    try {
        const events = await eventService.getEvents()

        return res.status(200).json({
            success: true,
            data: events
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch events'
        })
    }
}

const getEventByPublicId = async function (req, res) {
    const result = eventSchema.EventParamSchema.safeParse(req.params)

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Event Id'
        })
    }

    try {
        const event = await eventService.getEventByPublicId(result.data.publicId)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: event
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function registerUserForEvent(req, res) {
    const result = eventSchema.EventParamSchema.safeParse(req.params)

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Event Id'
        })
    }

    try {
        await eventService.registerUserForEvent({
            userId: req.user.userId,
            publicId: result.data.publicId
        })

        return res.status(201).json({
            success: true,
            message: 'Registered for event'
        })
    } catch (error) {
        if (error.code === 'EVENT_NOT_FOUND') {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }

        if (error.code === 'ALREADY_REGISTERED') {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }

        // unexpected error
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


async function getMyRegisteredEvents(req, res) {
    const { userId } = req.user

    try {
        const events = await userService.getMyRegisteredEvents(userId)

        return res.status(200).json(
            events
        )

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }

}


async function getMyCreatedEvents(req, res) {
    const { userId } = req.user

    try {
        const events = await eventService.getMyCreatedEvents(userId)
        return res.status(200).json(events)
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

async function getEventAttendees(req, res) {
    const { userId } = req.user
    const { publicId } = req.params

    const result = eventSchema.EventPublicIdParamSchema.safeParse({
        publicId
    })

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: 'Invalid event Id'
        })
    }
    try {
        const attendees = await eventService.getEventAttendees(result.data.publicId, userId)
        return res.status(200).json({
            success: true,
            attendees

        })

    } catch (err) {
        if (err.code === 'EVENT_NOT_FOUND') {
            return res.status(404).json({
                success: false,
                message: err.message
            })
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })

    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventByPublicId,
    registerUserForEvent,
    getMyRegisteredEvents,
    getMyCreatedEvents,
    getEventAttendees
}