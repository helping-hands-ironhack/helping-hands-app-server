const { Schema, model } = require("mongoose");

const ngoSchema = new Schema(
    {
        name: { type: string, required: true },
        email: { type: string, required: true },
        cif: { type: string, required: true },
        paxToHost: { type: Schema.Types.ObjectId, ref: 'Pax' }
    },
    {
        timestamps: true,
    }
);

const Ngo = model("Ngo", ngoSchema)

module.exports = Ngo;