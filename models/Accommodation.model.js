const { Schema, model } = require("mongoose");

const accommodationSchema = new Schema(
    {
        capacity: { type: number, required: true },
        rooms: { type: number, required: true },
        pics: [{ type: string, required: true }],
        description: { type: string, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        resquests: [{ type: Schema.Types.ObjectId, ref: 'Pax' }],
        isHosting: { type: boolean, required: true, default: false },
        currentGuests: [{ type: Schema.Types.ObjectId, ref: 'Pax' }]
    },
    {
        timestamps: true,
    }
);

const Accommodation = model("Accommodation", accommodationSchema)

module.exports = Accommodation;