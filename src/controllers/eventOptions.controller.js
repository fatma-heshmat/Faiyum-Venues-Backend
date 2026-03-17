const EventOptions = require("../models/eventOptions.model");

const createEventOptions = async (req, res) => {

  try {

    const newOptions = new EventOptions(req.body);

    const savedData = await newOptions.save();

    res.status(201).json({
      message: "Data saved successfully",
      data: savedData
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createEventOptions
};