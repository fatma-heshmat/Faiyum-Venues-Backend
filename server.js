const express = require("express");
const path = require('path'); // ناديت عليها بس، من غير npm install
require("dotenv").config();
const connectDB = require("./src/config/db");
connectDB();

const app = express(); // هنا بنشغل الإكسبريس
// Middleware
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

app.listen(process.env.PORT || 5000  , () => {
  console.log("Server running 🚀");
});











