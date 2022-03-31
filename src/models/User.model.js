var { Schema, model } = require("mongoose");

//User Schema
var UserSchema = Schema(
  {
    name: { type: String, default: null },
    email: { type: String, require: true, unique: true },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    phone: { type: String },
    address: {
      streetAddress: String,
      city: String,
      state: String,
      country: String,
    },
    company: String,
    website: String,
  },
  { timestamps: true }
);
const User = model("user", UserSchema);

module.exports = { User };
