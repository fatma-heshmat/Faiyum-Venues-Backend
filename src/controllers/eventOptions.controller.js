const EventOptions = require("../models/eventOptions");

const createEventOptions = async (req, res) => {
  try {
    const { eventDate, planner, venueId } = req.body;

    const plannerConflict = await EventOptions.findOne({ eventDate, planner });
    if (plannerConflict) {
      return res.status(400).json({ success: false, message: `Conflict: Planner (${planner}) is busy!` });
    }

    // تشيك المكان (بيشتغل على أي ID مكان مهما كان نوعه لأنه String)
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
 const getEventOptions = async (req, res) => {
  try {
    let query = {};
    
    // 1️⃣ سحب بيانات اليوزر اللي جاي من التوكن (ميدلواير auth)
    const userRole = req.user && req.user.role;
    const userNameFromToken = req.user && req.user.name; // 👈 تأكدي إن كود اللوجن بيخزن الـ name جوه التوكن

    if (userRole === "planner") {
      query.planner = userNameFromToken; 
    } else if (userRole === "admin") {
      // لو اللي داخل أدمن، بنسيب الـ query فاضية عشان يشوف السيستم كله زي ما هو في الصورة!
      // ولو الأدمن حابب يفلتر ببلانر معين عن طريق اللينك، السطر اللي تحت هيشغلها له:
      if (req.query.plannerName) {
        query.planner = req.query.plannerName;
      }
    }

    // بنجيب الداتا ونخفي الـ IDs والـ v عشان ترجع أسامي صافية للفرنت إند
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





