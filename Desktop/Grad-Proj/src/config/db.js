const mongoose = require("mongoose");
const connectDB = async () => {
  try {
   await mongoose.connect("mongodb+srv://fatma-heshmat9:Fatma2004@cluster0.fp6jf4g.mongodb.net/VenuesDB?retryWrites=true&w=majority");
    console.log("✅ MongoDB Connected to Atlas");
  } catch (err) {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
