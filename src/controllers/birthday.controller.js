const Birthday = require("../models/Birthday");
const asyncHandler = require("express-async-handler");

const getBirthdays = asyncHandler(async (req, res) => {
  const birthdays = await Birthday.find({});
  res.status(200).json(birthdays);
});

const getBirthdayDetails = asyncHandler(async (req, res) => {
  const birthday = await Birthday.findById(req.params.id);
  if (!birthday) return res.status(404).json({ message: "عيد الميلاد غير موجود" });
  res.status(200).json(birthday);
});

const createBirthday = asyncHandler(async (req, res) => {
  const { name, description, price, location, image, capacity, rating } = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  if (!name || !price || !description || !location || !finalImage) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  
  const birthday = await Birthday.create({
    name, 
    description, 
    price, 
    location, 
    image: finalImage,
    capacity: capacity, 
    rating: rating 
  });

  res.status(201).json(birthday); 
}); 

const updateBirthday = asyncHandler(async (req, res) => {
  const birthday = await Birthday.findById(req.params.id);
  if (!birthday) { res.status(404); throw new Error("Birthday venue not found"); }
  let image = birthday.image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    image = `${baseUrl}/uploads/${req.file.filename}`;
  }
  const updatedBirthday = await Birthday.findByIdAndUpdate(
    req.params.id,
    { ...req.body, image },
    { returnDocument: 'after' }
  );
  res.status(200).json(updatedBirthday);
});

const deleteBirthday = asyncHandler(async (req, res) => {
  const birthday = await Birthday.findById(req.params.id);
  if (!birthday) { res.status(404); throw new Error("Birthday venue not found"); }
  await Birthday.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Birthday venue deleted successfully" });
});

module.exports = { getBirthdays, getBirthdayDetails, createBirthday, updateBirthday, deleteBirthday };

