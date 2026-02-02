const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware"); // استدعاء الميدل وير

const authRoutes = require("./routes/auth.routes");
const venueRoutes = require("./routes/venue.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use('/uploads', express.static('uploads'));
// ده لازم يكون آخر Middleware قبل الـ module.exports
app.use(errorHandler); 

module.exports = app;