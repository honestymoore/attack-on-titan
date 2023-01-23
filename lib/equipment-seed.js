const express = require('express')

const Equipment = require('../models/equipment')

const router = express.Router()

const startEquipments = [
	{
		firstName: 'Eren',
		lastName: 'Jaeger',
		class: 'Titan',
		strength: 90,
	},
	{
		firstName: 'Mikasa',
		lastName: 'Ackerman',
		class: 'Cadet',
		strength: 120,
	},
	{
		firstName: 'Armin',
		lastName: 'Arlet',
		class: 'Cadet',
		strength: 60,
	},
]

router.get('/equipments', (req, res, next) => {
	Equipment.deleteMany({})
        .then(() => {
            Equipment.create(startEquipments)
                .then((equipments) => res.status(200).json({ equipments: equipments }))
        })
        .catch(next)
})

module.exports = router