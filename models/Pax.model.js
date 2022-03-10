const { Schema, model } = require("mongoose");

const paxSchema = new Schema(
    {
        adults: { type: Number },
        children: { type: Number },
        ngo: { type: Schema.Types.ObjectId, ref: 'Ngo' }
    },
    {
        timestamps: true,
    }
);

const Pax = model ("Pax", paxSchema)

module.exports = Pax;