const Birthday = require("../models/Birthday");
const asyncHandler = require("express-async-handler");

exports.getBirthdays = asyncHandler(async (req, res) => {
  const birthdays = await Birthday.find({});
  res.status(200).json(birthdays);
});

// جلب تفاصيل عيد ميلاد بالـ ID
exports.getBirthdayDetails = asyncHandler(async (req, res) => {
  const birthday = await Birthday.findById(req.params.id);
  if (!birthday) return res.status(404).json({ message: "عيد الميلاد غير موجود" });
  res.status(200).json(birthday);
});

exports.createBirthday = asyncHandler(async (req, res) => {
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
  })

  res.status(201).json(birthday); // السطر ده لازم يكون جوه الـ exports.createBirthday
}); // دي قفلة الـ asyncHandler والـ exports



