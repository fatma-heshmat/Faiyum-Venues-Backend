const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
 name: { type: String, required: true },
  specialization: { type: String, required: true }, 
  pricePerHour: { type: Number, required: true }, 
  workingHours: { type: String, default: "Full time" }, 
  image: { type: String, required: true },
  
  projectImages: [{ type: String }], 
  executionDate: { type: Date },     
  executionCost: { type: Number },   
  
  rate: { type: Number , default: 0 },         
  numberOfRatings: { type: Number, default: 0 }, 
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
