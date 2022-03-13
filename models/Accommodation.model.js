const { Schema, model } = require("mongoose");

const accommodationSchema = new Schema(
    {
        capacity: { type: Number, required: true },
        rooms: { type: Number, required: true },
        description: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        resquests: [{ type: Schema.Types.ObjectId, ref: 'Pax' }],
        isHosting: { type: Boolean, default: false },
        currentGuests: [{ type: Schema.Types.ObjectId, ref: 'Pax' }],
        imageUrl: {type:String, default: "https://cdn.pixabay.com/photo/2017/07/11/00/24/house-2492054_960_720.png"}
    },
    {
        timestamps: true,
    }
);

const Accommodation = model("Accommodation", accommodationSchema)

module.exports = Accommodation;