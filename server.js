// command center

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 7000

const characterRoutes = require('./routes/character-routes')
const requestLogger = require('./lib/request-logger')
const characterSeed = require('./lib/character-seed')
const campaignRoutes = require('./routes/campaign-routes')
const noteRoutes = require('./routes/note-routes')
const userRoutes = require('./routes/user-routes')

mongoose.set('strictQuery', true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({ origin: `http://127.0.0.1:5501` }))

app.use(express.json())

app.use(requestLogger)

app.use(characterRoutes)
app.use(campaignRoutes)
app.use(noteRoutes)
app.use(userRoutes)

app.use('/seed', characterSeed)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app