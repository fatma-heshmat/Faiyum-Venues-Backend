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
// 2. إعداد الـ CORS للهوست بتاع زميلك ولأي حد أونلاين
//const allowedOrigins = ['http://localhost:5173']; // ضيفي هنا لينك الفرونت لو رفعه


// 3. Middleware للبيانات
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. الصور (Static Files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 5. الـ Routes
app.use('/api/venues', require('./src/routes/venue.routes'));
app.use('/api/outdoors', require('./src/routes/outdoor.routes'));
// الـ Route الجديد بتاع الأفراح اللي طلباتك هتكون عليه
app.use('/api/weddings', require('./src/routes/wedding.routes'));
app.use('/api/birthdays', require('./src/routes/birthday.routes'));
app.use('/api/graduations', require('./src/routes/graduation.routes'));
app.use('/api/special-events', require('./src/routes/specialEvent.routes'));
app.use('/api/planners', require('./src/routes/planner.routes'));
//app.use('/api/signup', require('./src/routes/SignUp.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api', require('./src/routes/eventOptions.routes'));

// 6. تشغيل السيرفر بـ Port ديناميكي (عشان لما ترفعيه على Render أو Railway)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running Global on port ${PORT} 🚀`);
});