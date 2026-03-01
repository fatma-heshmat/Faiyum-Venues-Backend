const Outdoor = require("../models/Outdoor");
const asyncHandler = require("express-async-handler");

// جلب كل القاعات الـ Outdoor
exports.getOutdoors = asyncHandler(async (req, res) => {
  const outdoors = await Outdoor.find({});
  res.status(200).json(outdoors);
});
exports.getOutdoorDetails = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const outdoor = await Outdoor.findById(id);

  if (!outdoor) {
    res.status(404);
    throw new Error("Outdoor venue not found!");
  }

  res.status(200).json(outdoor);
});

// إضافة قاعة Outdoor جديدة
exports.createOutdoor = asyncHandler(async (req, res) => {
  const { name, description, price, location , image , capacity, rating } = req.body;

  // لو فيه ملف مرفوع هيستخدمه، لو مفيش هيستخدم اللينك اللي في الـ body
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  if (!name || !price || !description || !location || !finalImage) {
    res.status(400);
    throw new Error("برجاء إدخال كافة البيانات: الاسم، السعر، الوصف، والموقع");
  }


  //if (!req.file) {
    //res.status(400);
    //throw new Error("برجاء رفع صورة القاعة");
  //}

  //const baseUrl = `${req.protocol}://${req.get('host')}`;
  //const imageFullUrl = `${baseUrl}/uploads/${req.file.filename}`;
 const outdoor = await Outdoor.create({
    name, description, price, location,
    capacity: capacity || 0, // تخزين السعة
    rating: rating || 0,
    image: finalImage
  });


  res.status(201).json(outdoor);
});
