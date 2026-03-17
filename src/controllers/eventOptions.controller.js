const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
try {
    const { eventDate } = req.body;

    // 1. Check if the date is already booked
    const existingEvent = await EventOptions.findOne({ eventDate: eventDate });

    if (existingEvent) {
      return res.status(400).json({
        message: "This date is already booked. Please choose another date."
      });
    }

    // 2. If the date is available, save the new options
    const newOptions = new EventOptions(req.body);
    const savedData = await newOptions.save();

    res.status(201).json({
      message: "Event options saved successfully",
      data: savedData
    });

  } catch (error) {
    // This will catch the 'Past Date' validation error from the model
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createEventOptions
};
