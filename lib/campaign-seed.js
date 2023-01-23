const express = require('express')

const Campaign = require('../models/campaign')

const router = express.Router()

const startCampaigns = [
	{
		name: 'Battle of Trost',
        characters: {
            ObjectId: '63cafd3ebe23368f7aa82097',
            ObjectId: '63cafd3ebe23368f7aa82098',
            ObjectId: '63cafd3ebe23368f7aa82099'
        }
	},
    {
        name: 'Clash of the Titans',
        characters: {
            ObjectId: '63cafd3ebe23368f7aa82097',
            ObjectId: '63cafd3ebe23368f7aa82098',
            ObjectId: '63cafd3ebe23368f7aa82099'
        }
    }
]

router.get('/campaigns', (req, res, next) => {
	Campaign.deleteMany({})
        .then(() => {
            Campaign.create(startCampaigns)
                .then((campaigns) => res.status(200).json({ campaigns: campaigns }))
        })
        .catch(next)
})

module.exports = router