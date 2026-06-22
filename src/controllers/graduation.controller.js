const Graduation = require("../models/Graduation");
const asyncHandler = require("express-async-handler");

const getGraduations = asyncHandler(async (req, res) => {
  const graduations = await Graduation.find({});
  res.status(200).json(graduations);
});

const getGraduationDetails = asyncHandler(async (req, res) => {
  const graduation = await Graduation.findById(req.params.id);
  if (!graduation) {
    return res.status(404).json({ message: "قاعة التخرج غير موجودة" });
  }
  res.status(200).json(graduation);
});

const createGraduation = asyncHandler(async (req, res) => {
  const { name, description, price, location, image , capacity , rating} = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }
  
  if (!name || !price || !description || !location || !finalImage) {
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

const updateGraduation = asyncHandler(async (req, res) => {
  const graduation = await Graduation.findById(req.params.id);
  if (!graduation) { res.status(404); throw new Error("Graduation venue not found"); }
  let image = graduation.image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    image = `${baseUrl}/uploads/${req.file.filename}`;
  }
  const updatedGraduation = await Graduation.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image },
    { returnDocument: 'after' }
  );
  res.status(200).json(updatedGraduation);
});

const deleteGraduation = asyncHandler(async (req, res) => {
  const graduation = await Graduation.findById(req.params.id);
  if (!graduation) { res.status(404); throw new Error("Graduation venue not found"); }
  await Graduation.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Graduation venue deleted successfully" });
});

module.exports = { getGraduations, getGraduationDetails, createGraduation, updateGraduation, deleteGraduation };
