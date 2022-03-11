const { Schema, model } = require("mongoose");

const accommodationSchema = new Schema(
    {
        capacity: { type: Number, required: true },
        rooms: { type: Number, required: true },
        pics: [{ type: String, required: true }],
        description: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        resquests: [{ type: Schema.Types.ObjectId, ref: 'Pax' }],
        isHosting: { type: Boolean, required: true, default: false },
        currentGuests: [{ type: Schema.Types.ObjectId, ref: 'Pax' }]
    },
    {
        timestamps: true,
    }
);

const Accommodation = model("Accommodation", accommodationSchema)

module.exports = Accommodation;