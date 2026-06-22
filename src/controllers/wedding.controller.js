const Wedding = require("../models/Wedding"); 
const asyncHandler = require("express-async-handler");

const getWeddings = asyncHandler(async (req, res) => {
  const weddings = await Wedding.find({});
  res.status(200).json(weddings);
});

const getWeddingDetails = asyncHandler(async (req, res) => {
  const wedding = await Wedding.findById(req.params.id);
  if (!wedding) {
    res.status(404);
    throw new Error("قاعة الأفراح غير موجودة");
  }
  res.status(200).json(wedding);
});

const createWedding = asyncHandler(async (req, res) => {
  const { name, description, price, location, image } = req.body;
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }
  if (!name || !price || !description || !location || !finalImage || !capacity || !rating) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  const wedding = await Wedding.create({
    name, description, price, location , image: finalImage , capacity,  rating
  });
  res.status(201).json(wedding);

});

const updateWedding = asyncHandler(async (req, res) => {
  const wedding = await Wedding.findById(req.params.id);
  if (!wedding) {
    res.status(404);
    throw new Error("Wedding venue not found");
  }
  let image = wedding.image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    image = `${baseUrl}/uploads/${req.file.filename}`;
  }
  const updatedWedding = await Wedding.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image },
    { returnDocument: 'after' }
  );
  res.status(200).json(updatedWedding);
});

const deleteWedding = asyncHandler(async (req, res) => {
  const wedding = await Wedding.findById(req.params.id);
  if (!wedding) {
    res.status(404);
    throw new Error("Wedding venue not found");
  }
  await Wedding.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Wedding venue deleted successfully" });
});

module.exports = {
  getWeddings,
  getWeddingDetails,
  createWedding,
  updateWedding,
  deleteWedding
};
