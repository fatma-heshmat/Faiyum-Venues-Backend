const SpecialEvent = require("../models/SpecialEvent");
const asyncHandler = require("express-async-handler");

exports.getSpecialEvents = asyncHandler(async (req, res) => {
  const events = await SpecialEvent.find({});
  res.status(200).json(events);
});

// جلب تفاصيل مناسبة واحدة بالـ ID
exports.getSpecialEventDetails = asyncHandler(async (req, res) => {
  const event = await SpecialEvent.findById(req.params.id);
  if (!event) {
    return res.status(404).json({ message: "المناسبة غير موجودة" });
  }
  res.status(200).json(event);
});

exports.createSpecialEvent = asyncHandler(async (req, res) => {
  const { name, description, price, location, image , capacity, rating } = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }
  if (!name || !price || !description || !location || !finalImage || !capacity  || !rating) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  
  const event = await SpecialEvent.create({
    name, 
    description, 
    price, 
    location: location || "Fayoum, Egypt", 
    image: finalImage,
    capacity,
    rating
  });
  res.status(201).json(event);

});
