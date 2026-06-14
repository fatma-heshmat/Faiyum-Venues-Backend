const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventOptions.controller");

router.post("/event-options", eventController.createEventOptions);
router.get("/event-options", eventController.getEventOptions);
router.patch("/event-options/:id/status", eventController.updateEventStatus);
module.exports = router;
