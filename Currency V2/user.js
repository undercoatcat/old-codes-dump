const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  balance: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);