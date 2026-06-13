const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
  try {
    const { eventDate, plannerName } = req.body;

    const conflictBooking = await EventOptions.findOne({
      eventDate: eventDate,
      plannerName: plannerName
    });

    if (conflictBooking) {
      return res.status(400).json({
        success: false,
        message: `عفواً، البلانر ${plannerName} غير متاح في هذا التاريخ!`
      });
    }

    const newEventOption = await EventOptions.create(req.body);

    res.status(201).json({
      success: true,
      message: "تم حفظ الاختيارات بنجاح!",
      data: newEventOption
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "حدث خطأ في السيرفر: " + error.message
    });
  }
};

const getEventOptions = async (req, res) => {
  try {
    const latestOption = await EventOptions.findOne({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: latestOption
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






