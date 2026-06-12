const mongoose = require("mongoose");
const connectDB = async () => {
  try {
   await mongoose.connect("mongodb+srv://fatmaheshmat9:Fatma2026@cluster0.b2dfw1p.mongodb.net/VenuesDB?retryWrites=true&w=majority");
    console.log("✅ MongoDB Connected to Atlas");
  } catch (err) {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
