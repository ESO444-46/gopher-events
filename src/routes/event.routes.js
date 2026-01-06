const express = require('express')
const router = express.Router();

const eventController = require('../controllers/event.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

router.get("/:publicId", eventController.getEventByPublicId)

router.get('/', eventController.getEvents)

router.post('/', authMiddleware, eventController.createEvent)

router.post('/:publicId/register', authMiddleware, eventController.registerUserForEvent)


module.exports = router