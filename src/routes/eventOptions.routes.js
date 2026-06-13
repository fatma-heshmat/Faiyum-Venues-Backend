const express = require("express");
const router = express.Router();

const { createEventOptions, getEventOptions } = require("../controllers/eventOptions.controller");

const { protect } = require("../middleware/auth"); 
const { restrictTo } = require("../middleware/role.middleware");

router.post("/event-options", createEventOptions);

router.get("/event-options", protect, restrictTo("admin", "planner"), getEventOptions);

module.exports = router;
