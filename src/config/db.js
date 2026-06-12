const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI;
    
    await mongoose.connect(connString);
    console.log("✅ MongoDB Connected to Atlas");
  } catch (err) {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
