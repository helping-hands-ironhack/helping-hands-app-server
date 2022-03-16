const { Schema, model } = require("mongoose");

const paxSchema = new Schema(
    {
        title: {type: String},
        adults: { type: Number },
        children: { type: Number },
        isRequested: {type: Boolean, default: false},
        isHosted: {type: Boolean, default: false},
        hostedAt: { type: Schema.Types.ObjectId, ref: 'Accommodation' },
        ngo: { type: Schema.Types.ObjectId, ref: 'Ngo' }
    },
    {
        timestamps: true,
    }
);

const Pax = model ("Pax", paxSchema)

module.exports = Pax;