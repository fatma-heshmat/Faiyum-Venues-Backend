const Planner = require("../models/Planner");
const asyncHandler = require("express-async-handler");

exports.getPlanners = asyncHandler(async (req, res) => {
  const planners = await Planner.find({});
  res.status(200).json(planners);
});

// دالة إضافة تقييم جديد وحساب المتوسط (اللوجيك اللي طلبتيه)
exports.addPlannerReview = asyncHandler(async (req, res) => {
  const { plannerId, customerName, comment, userRating } = req.body;

  const planner = await Planner.findById(plannerId);
  if (!planner) {
    res.status(404);
    throw new Error("المنظم غير موجود");
  }

  // حساب المتوسط الحسابي: (القديم * عددهم + الجديد) / العدد الكلي الجديد
  const totalWeight = (planner.rating * planner.numberOfRatings) + Number(userRating);
  const newNumberOfRatings = planner.numberOfRatings + 1;
  
  planner.rating = (totalWeight / newNumberOfRatings).toFixed(1);
  planner.numberOfRatings = newNumberOfRatings;

  // إضافة الكومنت الجديد والاحتفاظ بآخر 3 فقط كما طلبتي
  planner.reviews.push({ customerName, comment, userRating });
  if (planner.reviews.length > 3) {
    planner.reviews.shift(); // حذف الأقدم
  }

  await planner.save();
  res.status(200).json(planner);
});

exports.createPlanner = asyncHandler(async (req, res) => {
  const { name, specialization, rate, pricePerHour, workingHours, image , executionCost, executionDate} = req.body;
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  // 2. معالجة الصورة الشخصية (التي تسمى عندك finalImage)
  let finalImage = image;
  if (req.files && req.files.image) {
    finalImage = `${baseUrl}/uploads/${req.files.image[0].filename}`;
  }

  // 3. معالجة صور التنفيذات الجديدة (التي طلبتِ إضافتها)
  let projectImagesArray = [];
  if (req.files && req.files.projectImages) {
    projectImagesArray = req.files.projectImages.map(file => `${baseUrl}/uploads/${file.filename}`);
  }

  // 4. التحقق من البيانات الأساسية كما في كودك
  if (!name || !specialization || !rate || !pricePerHour || !workingHours || !finalImage) {
    res.status(400);
    throw new Error("برجاء إدخال كافة البيانات ");
  }
  
  // 5. إنشاء المنظم مع الحفاظ على الترتيب والبيانات المطلوبة
  const planner = await Planner.create({
    name, 
    specialization, 
    rate, 
    pricePerHour, 
    workingHours, 
    image: finalImage, // الحفاظ على المسمى image في قاعدة البيانات
    executionCost, 
    executionDate,
    projectImages: projectImagesArray // إضافة مصفوفة الصور الجديدة
  });

  res.status(201).json(planner);
});
