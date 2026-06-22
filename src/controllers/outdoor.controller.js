const Outdoor = require("../models/Outdoor");
const asyncHandler = require("express-async-handler");

const getOutdoors = asyncHandler(async (req, res) => {
  const outdoors = await Outdoor.find({});
  res.status(200).json(outdoors);
});
const getOutdoorDetails = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const outdoor = await Outdoor.findById(id);

  if (!outdoor) {
    res.status(404);
    throw new Error("Outdoor venue not found!");
  }

  res.status(200).json(outdoor);
});

const createOutdoor = asyncHandler(async (req, res) => {
  const { name, description, price, location , image , capacity, rating } = req.body;

  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  if (!name || !price || !description || !location || !finalImage) {
    res.status(400);
    throw new Error("برجاء إدخال كافة البيانات: الاسم، السعر، الوصف، والموقع");
  }

 const outdoor = await Outdoor.create({
    name, description, price, location,
    capacity: capacity || 0, 
    rating: rating || 0,
    image: finalImage
  });


  res.status(201).json(outdoor);
});

const updateOutdoor = asyncHandler(async (req, res) => {
  const outdoor = await Outdoor.findById(req.params.id);
  if (!outdoor) { res.status(404); throw new Error("Outdoor venue not found"); }
  let image = outdoor.image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    image = `${baseUrl}/uploads/${req.file.filename}`;
  }
  const updatedOutdoor = await Outdoor.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image },
    { returnDocument: 'after' }
  );
  res.status(200).json(updatedOutdoor);
});

const deleteOutdoor = asyncHandler(async (req, res) => {
  const outdoor = await Outdoor.findById(req.params.id);
  if (!outdoor) { res.status(404); throw new Error("Outdoor venue not found"); }
  await Outdoor.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Outdoor venue deleted successfully" });
});

module.exports = { getOutdoors, getOutdoorDetails, createOutdoor, updateOutdoor, deleteOutdoor };
