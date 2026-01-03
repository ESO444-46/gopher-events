const express = require('express')
const app = express()
require('dotenv').config()

const authRoutes = require('./routes/auth.routes')
const eventRoutes = require('./routes/event.routes')

app.use(express.json());

app.use('/auth', authRoutes)

app.use('/events', eventRoutes)

module.exports = app