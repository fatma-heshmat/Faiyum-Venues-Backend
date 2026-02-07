const Graduation = require("../models/Graduation");
const asyncHandler = require("express-async-handler");

exports.getGraduations = asyncHandler(async (req, res) => {
  const graduations = await Graduation.find({});
  res.status(200).json(graduations);
});

exports.createGraduation = asyncHandler(async (req, res) => {
  const { name, description, price, location, image } = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }
  
  if (!name || !price || !description || !location || !finalImage) {
    res.status(400);
    throw new Error("برجاء إدخال كافة البيانات: الاسم، السعر، الوصف، والموقع");
  }
  
  const graduation = await Graduation.create({
    name, 
    description, 
    price, 
    location: location || "Fayoum, Egypt", 
    image: finalImage
  });
  res.status(201).json(graduation);
});