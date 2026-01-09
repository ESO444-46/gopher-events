const express = require('express')
const router = express.Router();

const eventController = require('../controllers/event.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

router.get('/', eventController.getEvents)

router.get('/:publicId', eventController.getEventByPublicId)

router.get('/me/created', authMiddleware, eventController.getMyCreatedEvents)

router.get('/me/registered', authMiddleware, eventController.getMyRegisteredEvents)

router.post('/', authMiddleware, eventController.createEvent)

router.post('/:publicId/register', authMiddleware, eventController.registerUserForEvent)


module.exports = router