const express = require('express')

const Campaign = require('../models/campaign')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

const router = express.Router()

// CREATE
// POST /notes
router.post('/notes', requireToken, (req, res, next) => {
    const campaignId = req.body.note.campaignId

    console.log(req.user)

    const note = req.body.note
    note.owner = req.user._id

    Campaign.findById(campaignId)
        .then(handle404)
        .then(campaign => {
            campaign.notes.push(note)
            return campaign.save()
        })
        .then(campaign => {
            res.status(201).json({ campaign: campaign })
        })
        .catch(next)
})

// UPDATE
// PATCH /notes/:id
router.patch('/notes/:noteId', requireToken, (req, res, next) => {
    const campaignId = req.body.note.campaignId

    const noteBody = req.body.note

    Campaign.findById(campaignId)
        .then(handle404)
        .then(campaign => {
            const note = campaign.notes.id(req.params.noteId)
            note.set(noteBody)
            return campaign.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /notes/:noteId
router.delete('/notes/:noteId', requireToken, (req, res, next) => {
    const campaignId = req.body.note.campaignId

    Campaign.findById(campaignId)
        .then(handle404)
        .then(campaign => {
            campaign.notes.id(req.params.noteId).remove()
            return campaign.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router