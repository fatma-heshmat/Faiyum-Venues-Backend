const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || process.env.DATABASE_URL || process.env.MONGO_URL;
    
    if (!connString) {
      throw new Error("Connection string is missing! Check your .env file or Railway variables.");
    }

    await mongoose.connect(connString);
    console.log("✅ MongoDB Connected to Atlas");
  } catch (err) {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
