// command center
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8000

const characterRoutes = require('./routes/character-routes')

// deprecation warning
mongoose.set('strictQuery', true)

// creates the connection between your local MongoDB and this express app
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// starting an express app
const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500` }))

// sending json 
// need to be able to accept json
app.use(express.json())

// server needs to know about this router!!!
app.use(characterRoutes)

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})

module.exports = app