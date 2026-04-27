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

// POST: عشان إنتي ترفعي القاعات من Postman
router.post('/', upload.single('image'), async (req, res) => {
 try {
    const wedding = new Wedding(req.body);
    await wedding.save();
    res.status(201).json(wedding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
// POST: عشان إنتي ترفعي القاعات من Postman
router.post('/', async (req, res) => {
 try {
    const wedding = new Wedding(req.body);
    await wedding.save();
    res.status(201).json(wedding);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
