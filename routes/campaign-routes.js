const express =require('express')

const { handle404 } = require('../lib/custom-errors')

const Campaign = require('../models/campaign')

const router = express.Router()

//INDEX
// GET /campaigns
router.get('/campaigns', (req, res, next) => {
    Campaign.find()
        .then(campaigns => {
            // THIS is not Array.protype.map
            // document method (model method) .map
            return campaigns.map(campaign => campaign)
        })
        .then(campaigns => {
            res.status(200).json({ campaigns: campaigns })
        })
        .catch(next)
})

// SHOW
// GET /campaigns/:id
router.get('/campaigns/:id', (req, res, next) => {
    Campaign.findById(req.params.id)
        .then(handle404)
        .then(campaign => {
            res.status(200).json({ campaign: campaign })
        })
        .catch(next)
})

// CREATE
// POST /campaigns
router.post('/campaigns', (req, res, next) => {
    // req.body
    // campaign: {}
    Campaign.create(req.body.campaign)
        .then(campaign => {
            // top lvl of this object is campaign
            res.status(201).json({ campaign: campaign })
        })
        .catch(next)
})

// UPDATE
// PATCH /campaigns/5a7db6c74d55bc51bdf39793
router.patch('/campaigns/:id', (req, res, next) => {

    const characterID = req.body.campaign.characterID
    delete req.body.campaign.characterID

	Campaign.findById(req.params.id)
		.then(handle404)
		.then((campaign) => {
            if (characterID){
                campaign.characters.push(characterID)

                campaign.save()
            }

			return campaign.updateOne(req.body.campaign)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// DELETE
// DELETE /campaign/:id
router.delete('/campaigns/:id', (req, res, next) => {
    Campaign.findById(req.params.id)
        .then(handle404)
        .then(campaign => {
            return campaign.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router