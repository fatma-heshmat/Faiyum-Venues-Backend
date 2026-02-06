const Birthday = require("../models/Birthday");
const asyncHandler = require("express-async-handler");

exports.getBirthdays = asyncHandler(async (req, res) => {
  const birthdays = await Birthday.find({});
  res.status(200).json(birthdays);
});

exports.createBirthday = asyncHandler(async (req, res) => {
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
  
  const birthday = await Birthday.create({
    name, 
    description, 
    price, 
    location, 
    image: finalImage
  });
  res.status(201).json(birthday);
});