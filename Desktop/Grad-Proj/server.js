require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors'); // استدعاء المكتبة
const path = require('path'); // ناديت عليها بس، من غير npm install
const connectDB = require("./src/config/db");
connectDB();

const app = express(); // هنا بنشغل الإكسبريس
// 2. تعديل الـ CORS عشان يبقى جلوبال فعلاً
// لو سبتيه localhost:5173 بس، زميلك مش هيعرف يفتح لما يرفع الفرونت أونلاين
app.use(cors()); // كدة أي حد يقدر يكلم السيرفر (مناسب للمرحلة دي)

// 3. Middleware للبيانات
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. الصور (Static Files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. الـ Routes
app.use('/api/venues', require('./src/routes/venue.routes'));

// 6. تشغيل السيرفر بـ Port ديناميكي (عشان لما ترفعيه على Render أو Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running Global on port ${PORT} 🚀`);
});