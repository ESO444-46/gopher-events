const express = require('express')
const app = express()
require('dotenv').config()

const cors = require("cors")
const authRoutes = require('./routes/auth.routes')
const eventRoutes = require('./routes/event.routes')

app.use(cors())
app.use(express.json());

app.use('/auth', authRoutes)

app.use('/events', eventRoutes)


module.exports = app