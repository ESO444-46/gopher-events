const eventSchema = require('../schemas/event.schema')
const eventService = require('../services/event.service')

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

        return res.json({
            event
        })
    } catch (err) {
        return res.status.json({
            success: false,
            message: 'Error'
        })
    }
}

module.exports = { createEvent }