const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // حطينا الرابط مباشرة هنا عشان نضمن إنه يقرأ VenuesDB ويجيب الـ 12 قاعة
    const conn = await mongoose.connect("mongodb+srv://fatmaheshmat9:Fatma2026@cluster0.b2dfw1p.mongodb.net/VenuesDB?retryWrites=true&w=majority&appName=Cluster0");
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Database Name: ${conn.connection.name}`); // ده هيأكد لنا إننا دخلنا VenuesDB
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
