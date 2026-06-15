const mongoose = require("mongoose");

const eventOptionsSchema = new mongoose.Schema({
  venueId: { type: String }, 
  venueName: { type: String }, 
  type: { type: String, default: "venues" },
  originalType: { type: String }, 
  eventType: { type: String },
  musicType: { type: [String] },
  drinks: { type: Boolean, default: false },
  meals: { type: Boolean, default: false },
  dessert: { type: Boolean, default: false },
  eventDate: { type: Date, required: [true, "Event date is required"] },
  planner: { type: String},
  customerName: { type: String, required: [true, "Customer name is required"] },
  payment: {
    method: { type: String },
    amount: { type: Number },
    status: { type: String, default: "pending" }
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("EventOptions", eventOptionsSchema);







