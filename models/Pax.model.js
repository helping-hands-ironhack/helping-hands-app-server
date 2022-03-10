const { Schema, model } = require("mongoose");

const paxSchema = new Schema(
    {
        adults: { type: number },
        children: { type: number },
        ngo: { type: Schema.Types.ObjectId, ref: 'Ngo' }
    },
    {
        timestamps: true,
    }
);

const Pax = model ("Pax", paxSchema)

module.exports = Pax;