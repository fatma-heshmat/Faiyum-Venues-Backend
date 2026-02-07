const Planner = require("../models/Planner");
const asyncHandler = require("express-async-handler");

exports.getPlanners = asyncHandler(async (req, res) => {
  const planners = await Planner.find({});
  res.status(200).json(planners);
});

exports.createPlanner = asyncHandler(async (req, res) => {
  const { name, specialization, rate, pricePerHour, workingHours, image } = req.body;
  
  let finalImage = image;
  if (req.file) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    finalImage = `${baseUrl}/uploads/${req.file.filename}`;
  }

  if (!name ||  !specialization || !rate || !pricePerHour || !workingHours || !finalImage) {
    res.status(400);
    throw new Error("برجاء إدخال كافة البيانات ");
  }
  
  const planner = await Planner.create({
    name, 
    specialization, 
    rate, 
    pricePerHour, 
    workingHours, 
    image: finalImage
  });
  res.status(201).json(planner);
});