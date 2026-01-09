const express = require('express')
const app = express()
require('dotenv').config()

const authRoutes = require('./routes/auth.routes')
const eventRoutes = require('./routes/event.routes')
const userRoutes = require('./routes/user.routes')

app.use(express.json());

app.use('/auth', authRoutes)

app.use('/events', eventRoutes)

app.use('/users', userRoutes)

module.exports = app