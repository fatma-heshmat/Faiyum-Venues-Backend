const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true }, // التخصص (Wedding, Birthday, etc.)
  rate: { type: Number }, // التقييم
  pricePerHour: { type: Number, required: true }, // سعر الساعة
  workingHours: { type: String, default: "Full time" }, // ساعات العمل
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Planner", plannerSchema);