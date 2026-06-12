const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
try {
    const { eventDate, place, placeType } = req.body;

    // التأكد إن المكان ده مش محجوز في اليوم ده
    const existingEvent = await EventOptions.findOne({ eventDate, place });

    if (existingEvent) {
      return res.status(400).json({
        message: "This date is already booked for this venue."
      });
    }

    const newOptions = new EventOptions(req.body);
    const savedData = await newOptions.save();

    res.status(201).json({
      message: "Event options saved successfully",
      data: savedData
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createEventOptions
};




