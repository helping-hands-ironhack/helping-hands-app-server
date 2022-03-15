const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    password: {type: String, required: true},
    email: {type: String, required:true},
    accommodations: [{type: Schema.Types.ObjectId, ref:'Accommodation'}],

    imageUrl: {type:String, default: "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png"},
    isNgo: {type: Boolean, default: false}

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
