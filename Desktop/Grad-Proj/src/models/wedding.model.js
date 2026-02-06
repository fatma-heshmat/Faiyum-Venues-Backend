const mongoose = require('mongoose');

const weddingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String } // لو هتحطي لينكات صور جاهزة حالياً
});

module.exports = mongoose.model('Wedding', weddingSchema);