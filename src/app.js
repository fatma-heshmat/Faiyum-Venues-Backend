const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware"); 

const authRoutes = require("./routes/auth.routes");
const venueRoutes = require("./routes/venue.routes");
const chatRoutes = require('./routes/chat.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/venues", venueRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/chat', chatRoutes);
app.use(errorHandler); 

module.exports = app;
