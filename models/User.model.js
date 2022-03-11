const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    password: {type: String, required: true},
    email: {type: String, required:true},
    accommodations: [{type: Schema.Types.ObjectId, ref:'Accommodation'}]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
