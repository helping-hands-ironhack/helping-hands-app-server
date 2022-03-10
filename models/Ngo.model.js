const { Schema, model } = require("mongoose");

const ngoSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        cif: { type: String, required: true },
        password: { type: String, required: true },
        paxToHost: { type: Schema.Types.ObjectId, ref: 'Pax' }
    },
    {
        timestamps: true,
    }
);

const Ngo = model("Ngo", ngoSchema)

module.exports = Ngo;