const Venue = require("../models/Venue");
const asyncHandler = require("express-async-handler");

// جلب كل القاعات مع ميزة البحث والفلترة بالنوع
exports.getVenues = asyncHandler(async (req, res) => {
  // بنجيب كل القاعات من الداتابيز بالبيانات اللي إنتِ حددتيها
  const venues = await Venue.find({});
  
  if (venues) {
    res.status(200).json(venues);
  } else {
    res.status(404);
    throw new Error("لا يوجد قاعات لعرضها حالياً");
  }
});
// دالة إضافة قاعة جديدة
exports.createVenue = asyncHandler(async (req, res) => {
  // 1. استلام البيانات من Body (بناءً على طلبك شلنا الكاتيجوري)
  const { name, description, price, location } = req.body;

  // 2. التأكد من إدخال البيانات الأساسية
  if (!name || !price || !description || !location) {
    res.status(400);
    throw new Error("Please add all required fields (name, price, description, location)");
  }

  // 3. التأكد من رفع الصورة
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an image");
  }

  // 4. حفظ البيانات في الداتابيز
  const venue = await Venue.create({
    name,
    description,
    price,
    location,
    image: `/uploads/${req.file.filename}`, // مسار الصورة اللي هيتخزن
  });

  // 5. رد السيرفر بنجاح العملية
  res.status(201).json(venue);
});


