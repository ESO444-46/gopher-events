const { success } = require('zod')
const userService = require('../services/userEvent.service')

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


module.exports = {
    getMyRegisteredEvents
}