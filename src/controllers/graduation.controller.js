const Graduation = require("../models/Graduation");
const asyncHandler = require("express-async-handler");

exports.getGraduations = asyncHandler(async (req, res) => {
  const graduations = await Graduation.find({});
  res.status(200).json(graduations);
});

// جلب تفاصيل قاعة تخرج واحدة بالـ ID
exports.getGraduationDetails = asyncHandler(async (req, res) => {
  const graduation = await Graduation.findById(req.params.id);
  if (!graduation) {
    return res.status(404).json({ message: "قاعة التخرج غير موجودة" });
  }
  res.status(200).json(graduation);
});

exports.createGraduation = asyncHandler(async (req, res) => {
  const { name, description, price, location, image , capacity, rating } = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }
  
  if (!name || !price || !description || !location || !finalImage , capacity, rating) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  
  const graduation = await Graduation.create({
    name, 
    description, 
    price, 
    location: location || "Fayoum, Egypt", 
    image: finalImage,
    capacity, 
    rating
  });
  res.status(201).json(graduation);

});
