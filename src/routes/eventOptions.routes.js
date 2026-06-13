const express = require("express");
const router = express.Router();

const { 
  createEventOptions, 
  getEventOptions 
} = require("../controllers/eventOptions.controller");

router.route("/")
  .post(createEventOptions)   
  .get(getEventOptions);

module.exports = router;
