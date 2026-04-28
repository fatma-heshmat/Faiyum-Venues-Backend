const express = require('express');
const router = express.Router();
const Wedding = require('../models/Wedding');

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

// POST: حل نهائي لمشكلة "Cannot destructure property name"
router.post('/', async (req, res) => {
  try {
    // 1. سحب البيانات مباشرة من req.body
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const location = req.body.location;
    const image = req.body.image;
    const capacity = req.body.capacity;
    const rating = req.body.rating;

    // 2. التحقق من وجود الحقول الأساسية
    if (!name || !price || !description) {
      return res.status(400).json({ message: "Missing required fields: name, price, or description" });
    }

    // 3. إنشاء وحفظ القاعة
    const wedding = new Wedding({
      name,
      description,
      price,
      location,
      image: image || "default_link_here", // لو مفيش صورة هياخد لينك افتراضي
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
