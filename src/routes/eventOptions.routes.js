const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventOptions.controller");

router.post("/event-options", eventController.createEventOptions);
router.get("/event-options", eventController.getEventOptions);

module.exports = router;
