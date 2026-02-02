const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected to Compass");
  } catch (err) {
    console.error("❌ Connection Error:", err.message);
  }
};
module.exports = connectDB;
