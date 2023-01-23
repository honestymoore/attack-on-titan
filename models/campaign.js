const mongoose = require('mongoose')

const Schema = mongoose.Schema

const campaignSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
        characters: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Character'
            }
        ]
	},
	{
		timestamps: true,
	}
)

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign