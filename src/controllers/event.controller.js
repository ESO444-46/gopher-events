const { success } = require('zod')
const { createEventSchema } = require('../schemas/event.schema')

function createEvent(req, res) {
    const result = createEventSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            success: false,
            errors: result.error.flatten().fieldErrors
        })
    }
    const validatedData = result.data

}

module.exports = { createEvent }