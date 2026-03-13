const mongoose = require("mongoose");

const weddingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String }, // اللوكيشن الاحتياطي اللي طلبتيه
  image: { type: String, required: true },
  capacity: { type: Number, default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = mongoose.model("Wedding", weddingSchema);
