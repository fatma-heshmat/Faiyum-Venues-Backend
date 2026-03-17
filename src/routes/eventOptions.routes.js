const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventOptions.controller");

router.post("/event-options", eventController.createEventOptions);

module.exports = router;