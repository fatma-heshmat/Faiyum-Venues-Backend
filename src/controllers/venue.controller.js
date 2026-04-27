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
  // 1. استلام البيانات من Body 
  const { name, description, price, location, capacity, rating , image} = req.body;
// لو مفيش ملف مرفع، هنستخدم اللينك اللي جاي في خانة image
  let finalImage = image; 

  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  // التأكد من إن الحاجات الأساسية موجودة (شيلنا شرط req.file الإجباري)
  if (!name || !price || !description || !location || !capacity || !finalImage) {
    res.status(400);
    throw new Error("Please add all required fields and an image link/file");
  }

  const venue = await Venue.create({
    name, description, price, location, capacity, rating,
    image: finalImage, 
  });
  // 5. رد السيرفر بنجاح العملية
  res.status(201).json(venue);
});

exports.getVenueDetails = async (req, res) => {
  try {
    // بناخد الـ ID من الرابط (URL)
    const venueId = req.params.id; 

    // بندور في الداتابيز بالـ ID ده
    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found!" });
    }

    // بنبعت بيانات القاعة اللي لقيناها
    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



