const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
  try {
    const { eventDate, plannerName } = req.body;

    const dateConflict = await EventOptions.findOne({ eventDate: eventDate });
    
    if (dateConflict) {
      return res.status(400).json({
        success: false,
        message: `عفواً، تاريخ اليوم ${new Date(eventDate).toLocaleDateString()} محجوز بالفعل في السيستم! يرجى اختيار يوم آخر.`
      });
    }

    // 2️⃣ الكوندشن الثاني: التشيك على البلانر في نفس التاريخ (أمان زيادة)
    const plannerConflict = await EventOptions.findOne({
      eventDate: eventDate,
      plannerName: plannerName
    });

    if (plannerConflict) {
      return res.status(400).json({
        success: false,
        message: `عفواً، البلانر ${plannerName} مشغول ومحجوز بالفعل في هذا التاريخ!`
      });
    }

    const newEventOption = await EventOptions.create(req.body);

    res.status(201).json({
      success: true,
      message: "تم حفظ الاختيارات بنجاح وبدون أي تضاد!",
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






