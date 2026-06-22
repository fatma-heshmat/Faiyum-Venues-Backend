const Venue = require("../models/Venue");
const asyncHandler = require("express-async-handler");

const getVenues = asyncHandler(async (req, res) => {
  const venues = await Venue.find({});
  
  if (venues) {
    res.status(200).json(venues);
  } else {
    res.status(404);
    throw new Error("لا يوجد قاعات لعرضها حالياً");
  }
});

const createVenue = asyncHandler(async (req, res) => {
  const { name, description, price, location, capacity, rating , image} = req.body;
  let finalImage = image; 

  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  if (!name || !price || !description || !location || !capacity || !finalImage) {
    res.status(400);
    throw new Error("Please add all required fields and an image link/file");
  }

  const venue = await Venue.create({
    name, description, price, location, capacity, rating,
    image: finalImage, 
  });
  res.status(201).json(venue);
});

const getVenueDetails = async (req, res) => {
  try {
    const venueId = req.params.id; 
    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found!" });
    }

    res.status(200).json(venue);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateVenue = asyncHandler(async (req, res) => {

  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    res.status(404);
    throw new Error("Venue not found");
  }

  let image = venue.image;

  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    image = `${baseUrl}/uploads/${req.file.filename}`;
  }

  const updatedVenue = await Venue.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image
     },
  { returnDocument: 'after' }  );

  res.status(200).json(updatedVenue);

});

const deleteVenue = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    res.status(404);
    throw new Error("Venue not found");
  }

  await Venue.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Venue deleted successfully"
  });
});

module.exports = {
  getVenues,
  createVenue,
  getVenueDetails,
  updateVenue,
  deleteVenue
};


