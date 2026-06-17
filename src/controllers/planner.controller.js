const mongoose = require("mongoose");
const Planner = require("../models/Planner");
const asyncHandler = require("express-async-handler");

exports.getPlanners = asyncHandler(async (req, res) => {
  const planners = await Planner.find({});
  res.status(200).json(planners);
});

exports.getPlannerDetails = asyncHandler(async (req, res) => {
 if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid Planner ID format");
  }
  
  const planner = await Planner.findById(req.params.id);
  if (!planner) {
    res.status(404);
    throw new Error("المنظم غير موجود");
  }

  res.status(200).json(planner);
});

exports.addPlannerReview = asyncHandler(async (req, res) => {
  const { plannerId, customerName, comment, userRating } = req.body;

  const planner = await Planner.findById(plannerId);
  if (!planner) {
    res.status(404);
    throw new Error("المنظم غير موجود");
  }

  const totalWeight = (planner.rating * planner.numberOfRatings) + Number(userRating);
  const newNumberOfRatings = planner.numberOfRatings + 1;
  
  planner.rating = (totalWeight / newNumberOfRatings).toFixed(1);
  planner.numberOfRatings = newNumberOfRatings;

  planner.reviews.push({ customerName, comment, userRating });
  if (planner.reviews.length > 3) {
    planner.reviews.shift(); 
  }

  await planner.save();
  res.status(200).json(planner);
});

exports.createPlanner = asyncHandler(async (req, res) => {
  const { name, specialization, rate, pricePerHour, workingHours, image , executionCost, executionDate} = req.body;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  let finalImage = image;
  if (req.files && req.files.image) {
    finalImage = `${baseUrl}/uploads/${req.files.image[0].filename}`;
  }

  let projectImagesArray = [];
  if (req.files && req.files.projectImages) {
    projectImagesArray = req.files.projectImages.map(file => `${baseUrl}/uploads/${file.filename}`);
  }

  if (!name || !specialization || !rate || !pricePerHour || !workingHours || !finalImage) {
    res.status(400);
    throw new Error("برجاء إدخال كافة البيانات ");
  }
  
  const planner = await Planner.create({
    name, 
    specialization, 
    rate, 
    pricePerHour, 
    workingHours, 
    image: finalImage,  
    executionCost, 
    executionDate,
    projectImages: projectImagesArray 
  });

  res.status(201).json(planner);
});
