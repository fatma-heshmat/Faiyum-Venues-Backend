const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(✅ MongoDB Connected to: ${conn.connection.name});
  } catch (error) {
    console.error(❌ DB Connection Error: ${error.message});
    process.exit(1);
  }
};

module.exports = connectDB;
