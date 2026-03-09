const Birthday = require("../models/Birthday");
const asyncHandler = require("express-async-handler");

// 1. جلب كل أعياد الميلاد
exports.getBirthdays = asyncHandler(async (req, res) => {
  const birthdays = await Birthday.find({});
  res.status(200).json(birthdays);
});

// 2. جلب تفاصيل عيد ميلاد بالـ ID
exports.getBirthdayDetails = asyncHandler(async (req, res) => {
  const birthday = await Birthday.findById(req.params.id);
  if (!birthday) return res.status(404).json({ message: "عيد الميلاد غير موجود" });
  res.status(200).json(birthday);
});

// 3. إضافة عيد ميلاد جديد
exports.createBirthday = asyncHandler(async (req, res) => {
  const { name, description, price, location, image, capacity, rating } = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  // التأكد من البيانات الأساسية فقط
  if (!name || !price || !description || !location || !finalImage) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }
  
  // ترتيب الحقول هنا بيخليها تظهر مرتبة في الـ JSON (الكباسيتي والريتنج في الآخر)
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


