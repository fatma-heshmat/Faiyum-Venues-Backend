const mongoose = require("mongoose");

const outdoorSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number, // السعر
  image: String, // الصور بنفس طريقة الرفع
  location: String, // اللوكيشن
  capacity: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Outdoor", outdoorSchema);
