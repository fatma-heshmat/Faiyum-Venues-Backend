require("dotenv").config();
const express = require("express");
const connectDB = require('./src/config/db'); 
const cors = require('cors'); 
const path = require('path'); 
const mongoose = require('mongoose');

const app = express();
connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
