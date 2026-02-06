const mongoose = require("mongoose");

const outdoorSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number, // السعر
  image: String, // الصور بنفس طريقة الرفع
  location: String // اللوكيشن
}, { timestamps: true });

module.exports = mongoose.model("Outdoor", outdoorSchema);
