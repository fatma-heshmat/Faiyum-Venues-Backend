const Wedding = require("../models/Wedding"); // خلي الحرف W كبير هنا عشان يطابق الملف
const asyncHandler = require("express-async-handler");

exports.getWeddings = asyncHandler(async (req, res) => {
  const weddings = await Wedding.find({});
  res.status(200).json(weddings);
});

// جلب تفاصيل فرح معين بالـ ID (ده اللي زميلك محتاجه)
exports.getWeddingDetails = asyncHandler(async (req, res) => {
  const wedding = await Wedding.findById(req.params.id);
  if (!wedding) {
    res.status(404);
    throw new Error("قاعة الأفراح غير موجودة");
  }
  res.status(200).json(wedding);
});

exports.createWedding = asyncHandler(async (req, res) => {
  const { name, description, price, location, image, capacity, rating } = req.body;
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

