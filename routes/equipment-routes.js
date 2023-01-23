const express =require('express')

const { handle404 } = require('../lib/custom-errors')

const Equipment = require('../models/equipment')

const router = express.Router()

//INDEX
// GET /equipment
router.get('/equipment', (req, res, next) => {
    Equipment.find()
        .then(equipment => {
            // THIS is not Array.protype.map
            // document method (model method) .map
            return equipment.map(equipment => equipment)
        })
        .then(equipment => {
            res.status(200).json({ equipment: equipment })
        })
        .catch(next)
})

// SHOW
// GET /equipment/:id
router.get('/equipment/:id', (req, res, next) => {
    Equipment.findById(req.params.id)
        .then(handle404)
        .then(equipment => {
            res.status(200).json({ equipment: equipment })
        })
        .catch(next)
})

// CREATE
// POST /equipmetn
router.post('/equipment', (req, res, next) => {
    // req.body
    // equipment: {}
    Equipment.create(req.body.equipment)
        .then(equipment => {
            // top lvl of this object is equipment
            res.status(201).json({ equipment: equipment })
        })
        .catch(next)
})

// UPDATE
// PATCH /equipment/:id
router.patch('/equipment/:id', (req, res, next) => {
    Equipment.findById(req.params.id)
        .then(handle404)
        .then(equipment => {
            // { equipment: {} }
            return equipment.updateOne(req.body.equipment)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /equipment/:id
router.delete('/equipment/:id', (req, res, next) => {
    equipment.findById(req.params.id)
        .then(handle404)
        .then(equipment => {
            return equipment.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router