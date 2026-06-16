const express = require("express");
const router = express.Router();
const { createEventOptions, getEventOptions, updateEventStatus } = require("../controllers/eventOptions.controller");
const auth = require("../middleware/auth"); 

// 2️⃣ شرط الأمان السريع والصخر بناءً على الـ role اللي جوه التوكن
const checkAllowedUsers = (req, res, next) => {
  // بنسحب الرتبة اللي الميدلواير بتاعك فكها من التوكن وحطها في req.user
  const userRole = req.user && req.user.role; 

  if (userRole === "admin" || userRole === "planner") {
    return next(); 
  }

  return res.status(403).json({ 
    success: false, 
    message: "Access Denied! You do not have permission to access this dashboard." 
  });
};

router.post("/event-options", createEventOptions); 

router.get("/event-options", auth, checkAllowedUsers, getEventOptions);

router.patch("/event-options/:id/status", auth, checkAllowedUsers, updateEventStatus);

module.exports = router;
