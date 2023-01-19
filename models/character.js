const mongoose = require('mongoose')

const Schema = mongoose.Schema

const characterSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		class: {
			type: String,
			required: true,
		},
        strength: {
            type: Number,
            required: true,
            min: 1,
            max: 99999
        }
	},
	{
        timestamps: true
    }
)

// mongosh collection characters
const Character = mongoose.model('Character', characterSchema)

module.exports = Character