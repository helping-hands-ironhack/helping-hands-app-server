const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: {type: string, required:true},
    lastName: {type: string, required:true},
    email: {type: string, required:true},
    accommodations: [{type: Schema.Types.ObjectId, ref:'Accommodation'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
