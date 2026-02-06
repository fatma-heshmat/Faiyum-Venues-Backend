const express = require('express');
const router = express.Router();
const Wedding = require('../models/wedding.model');

// GET: عشان زميلك يسحب كل القاعات
router.get('/', async (req, res) => {
  try {
    const venues = await Wedding.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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