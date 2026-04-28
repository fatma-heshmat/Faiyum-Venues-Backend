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

// POST: عشان ترفعي القاعات من Postman وتتحل مشكلة الـ Validation
router.post('/', async (req, res) => {
 try {
    // 1. استلام البيانات من الجسم (req.body)
    const { name, description, price, location, image, capacity, rating } = req.body;

    // 2. تجميع البيانات في كائن واحد (عشان نضمن إنها واصلة للموديل صح)
    const weddingData = {
      name,
      description,
      price,
      location,
      image, // هنا السيرفر هياخد اللينك أو النص اللي باعتاده في خانة image
      capacity: capacity || 0,
      rating: rating || 0
    };

    const wedding = new Wedding(weddingData);
    await wedding.save();
    res.status(201).json(wedding);
  } catch (err) {
    // لو فيه حاجة ناقصة هيطلع لك رسالة واضحة هنا
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
