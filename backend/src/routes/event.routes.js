const express = require('express')
const router = express.Router();

const eventController = require('../controllers/event.controller')
const { authMiddleware, requireOrganizer } = require('../middlewares/auth.middleware')

router.get('/', eventController.getEvents)

router.get('/:publicId', eventController.getEventByPublicId)

//router.get('/me/created', authMiddleware, eventController.getMyCreatedEvents)

//router.get('/me/registered', authMiddleware, eventController.getMyRegisteredEvents)

//router.get('/:publicId/attendees', authMiddleware, eventController.getEventAttendees)

router.post('/', authMiddleware, requireOrganizer, eventController.createEvent)

router.put('/:publicId', authMiddleware, eventController.updateEvent)

router.post('/:publicId/rsvp', authMiddleware, eventController.registerUserForEvent)


module.exports = router
