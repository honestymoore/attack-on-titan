const mongoose = require('mongoose')
const equipmentSchema = require('./equipment')

const Schema = mongoose.Schema

const equipmentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
        weight: {
            type: Number,
            required: true,
            min: 0,
            max: 10000
        },
    },
	{
		timestamps: true,
	}
)

const Equipment = mongoose.model('Equipment', equipmentSchema)

module.exports = Equipment