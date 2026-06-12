require("dotenv").config();
const express = require("express");
const cors = require('cors'); // (تعديل 1) استدعاء مكتبة الـ CORS
const path = require('path'); // ناديت عليها بس، من غير npm install
const mongoose = require('mongoose');
const connectDB = require("./src/config/db");

connectDB();

const app = express(); // هنا بنشغل الإكسبريس

// Middleware
app.use(cors()); // (تعديل 2) السماح للفرونت إند إنه يكلم السيرفر من غير ما المتصفح يمنعه
app.use(express.json());

// السطر اللي ضفناه للصور (تأكدي إنه بعد تعريف app)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// هنا لازم تنادي على الـ Routes بتاعتك (تأكدي إنك ضفتيهم)
app.use('/api/venues', require('./src/routes/venue.routes'));
app.use('/api/outdoors', require('./src/routes/outdoor.routes'));
app.use('/api/weddings', require('./src/routes/wedding.routes'));
app.use('/api/birthdays', require('./src/routes/birthday.routes'));
app.use('/api/graduations', require('./src/routes/graduation.routes'));
app.use('/api/special-events', require('./src/routes/specialEvent.routes'));
app.use('/api/planners', require('./src/routes/planner.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api', require('./src/routes/eventOptions.routes'));
app.use('/api/chat', require('./src/routes/chat.routes'));
app.use('/api/bookings', require('./src/routes/bookingRoutes'));

// (تعديل 3) تظبيط البورت عشان Railway يقدر يغيره براحته
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
