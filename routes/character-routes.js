const express = require('express')

const Character = require('../models/character')

const router = express.Router()

//INDEX
// GET /characters
router.get('/characters', (req, res, next) => {
    Character.find()
        .then(characters => {
            return characters.map(character => character)
        })
        .then(characters => {
            res.status(200).json({ characters: characters })
        })
        .catch(next)
})

// SHOW
// GET /characters/:id
router.get('/characters/:id', (req, res, next) => {
    Character.findById(req.params.id)
        .then(character => {
            res.status(200).json({ character: character })
        })
        .catch(next)
})

// CREATE
// POST /characters
router.post('/characters', (req, res, next) => {
    Character.create(req.body.character)
        .then(character => {
            res.status(201).json({ character: character })
        })
        .catch(next)
})

module.exports = router