const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
try {
    const { eventDate, plannerName, place } = req.body;

    if (place) {
      const existingPlaceEvent = await EventOptions.findOne({ eventDate, place });
      if (existingPlaceEvent) {
        return res.status(400).json({
          message: "This date is already booked for this venue."
        });
      }
    }

    const existingPlannerEvent = await EventOptions.findOne({ eventDate, plannerName });
    if (existingPlannerEvent) {
      return res.status(400).json({
        message: "This planner is already booked on this date. Please choose another planner or date."
      });
    }

    const newOptions = new EventOptions(req.body);
    const savedData = await newOptions.save();

    res.status(201).json({
      message: "Event options saved successfully",
      data: savedData
    });

  } catch (error) {
    res.status(400).json({ 
      message: error.message 
    });
  }
};

module.exports = { createEventOptions };




