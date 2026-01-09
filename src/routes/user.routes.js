const express = require('express');
const router = express.Router();
const { getMyRegisteredEvents } = require('../controllers/user.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')

router.get('/me/events', authMiddleware, getMyRegisteredEvents)


module.exports = router