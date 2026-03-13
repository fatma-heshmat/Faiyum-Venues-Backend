const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
 name: { type: String, required: true },
  specialization: { type: String, required: true }, 
  pricePerHour: { type: Number, required: true }, 
  workingHours: { type: String, default: "Full time" }, 
  image: { type: String, required: true },
  
  projectImages: [{ type: String }], // مصفوفة لصور التنفيذات السابقة
  executionDate: { type: Date },     // تاريخ التنفيذ
  executionCost: { type: Number },   // تكلفة التنفيذ
  
  rate: { type: Number , default: 0 },         // المتوسط الحسابي للتقييم
  numberOfRatings: { type: Number, default: 0 }, // عدد الناس اللي قيموا
  reviews: [
    {
      customerName: String,
      comment: String,
      userRating: Number,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Planner", plannerSchema);
