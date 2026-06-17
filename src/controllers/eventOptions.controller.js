const EventOptions = require("../models/eventOptions");
const User = require("../models/User");

const createEventOptions = async (req, res) => {
  try {
    const { eventDate, planner, venueId } = req.body;

    const plannerConflict = await EventOptions.findOne({ eventDate, planner });
    if (plannerConflict) {
      return res.status(400).json({ success: false, message: `Conflict: Planner (${planner}) is busy!` });
    }

    if (venueId && venueId !== "...") {
      const venueConflict = await EventOptions.findOne({ eventDate, venueId });
      if (venueConflict) {
        return res.status(400).json({ success: false, message: "Conflict: This venue is already reserved!" });
      }
    }

    const newEventOption = await EventOptions.create(req.body);
    res.status(201).json({ success: true, message: "Saved successfully!", data: newEventOption });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};


 const getEventOptions = async (req, res) => {
  try {
    let query = {};
    const userRole = req.user && req.user.role;
    
    const userIdFromToken = req.user && (req.user.id || req.user._id); 

    if (userRole === "planner") {
      const currentUser = await User.findById(userIdFromToken);
      
      if (!currentUser) {
        return res.status(404).json({ success: false, message: "Planner account not found!" });
      }

      query.planner = currentUser.name; 

    } else if (userRole === "admin") {
      if (req.query.plannerName) {
        query.planner = req.query.plannerName;
      }
    }

    const allOptions = await EventOptions.find(query)
      .select("-__v -venueId") 
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, count: allOptions.length, data: allOptions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

const updateEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status!" });
    }

    const updatedBooking = await EventOptions.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { returnDocument: 'after', runValidators: true }
    );

    res.status(200).json({ success: true, message: `Successfully ${status}!`, data: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

module.exports = { createEventOptions, getEventOptions, updateEventStatus };





