const Wedding = require("../models/Wedding"); // خلي الحرف W كبير هنا عشان يطابق الملف
const asyncHandler = require("express-async-handler");

exports.getWeddings = asyncHandler(async (req, res) => {
  const weddings = await Wedding.find({});
  res.status(200).json(weddings);
});

exports.createWedding = asyncHandler(async (req, res) => {
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
  const wedding = await Wedding.create({
    name, description, price, location , image: finalImage
  });
  res.status(201).json(wedding);

});
