const express = require('express');
const router = express.Router();
const Wedding = require('../models/Wedding');
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const venues = await Wedding.find();
    res.json(venues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, location, capacity, rating } = req.body;
    
    let finalImage = req.body.image; 
    if (req.file) {
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
