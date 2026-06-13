const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
  try {
    const { eventDate, plannerName } = req.body;

    const conflictBooking = await EventOptions.findOne({
      $or: [
        { eventDate: eventDate }, 
        { eventDate: eventDate, plannerName: plannerName } 
      ]
    });

    if (conflictBooking) {
      
      if (conflictBooking.plannerName === plannerName && conflictBooking.eventDate.toISOString() === new Date(eventDate).toISOString()) {
        return res.status(400).json({
          success: false,
          message: `Conflict: Planner (${plannerName}) is already booked on this date!`
        });
      }

      return res.status(400).json({
        success: false,
        message: `Conflict: The date ${new Date(eventDate).toLocaleDateString()} is already fully booked! Please choose another date.`
      });
    }

    const newEventOption = await EventOptions.create(req.body);

    res.status(201).json({
      success: true,
      message: "Event options saved successfully!",
      data: newEventOption
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message
    });
  }
};

const getEventOptions = async (req, res) => {
  try {
    const allOptions = await EventOptions.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: allOptions.length, 
      data: allOptions         
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message
    });
  }
};

module.exports = {
  createEventOptions,
  getEventOptions
};






