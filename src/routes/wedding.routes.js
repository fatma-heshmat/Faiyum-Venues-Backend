const express = require('express');
const router = express.Router();
const Wedding = require('../models/Wedding');
const upload = require('../middleware/upload');

// GET: عشان زميلك يسحب كل القاعات
router.get('/', async (req, res) => {
  try {
    const venues = await Wedding.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: عشان يسحب قاعة واحدة بس عن طريق الـ ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Wedding.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({ message: "القاعة غير موجودة" });
    }
    res.json(venue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: التعديل عشان يقبل form-data وصور
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // لما بنستخدم multer، البيانات بتنزل في req.body والصورة في req.file
    const { name, description, price, location, capacity, rating } = req.body;
    
    let finalImage = req.body.image; // لو باعتة لينكات نصية
    if (req.file) {
      // لو رافعة ملف صورة حقيقي من الكمبيوتر
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      finalImage = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const wedding = new Wedding({
      name,
      description,
      price,
      location,
      image: finalImage,
      capacity: capacity || 0,
      rating: rating || 0
    });

    await wedding.save();
    res.status(201).json(wedding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
