const { Schema, model } = require("mongoose");
const { array } = require("../config/cloudinary.config");

const ngoSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        email: { type: String, required: true },
        cif: { type: String, required: true },
        password: { type: String, required: true },
        paxToHost: [{type: Schema.Types.ObjectId, ref:'Pax'}],
        isNgo: {type: Boolean, default: true},
        imageUrl: {type:String, default: "https://voiping.es/wp-content/themes/aaika/images/default.jpg"}
    },
    {
        timestamps: true,
    }
);

const Ngo = model("Ngo", ngoSchema)

module.exports = Ngo;