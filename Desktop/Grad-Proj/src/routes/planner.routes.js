const router = require("express").Router();
const { getPlanners, createPlanner , getPlannerDetails , addPlannerReview} = require("../controllers/planner.controller");
const multer = require('multer');

// إعداد المخزن المؤقت للصور (لو حبيتي ترفعي ملفات)
const upload = multer({ dest: 'uploads/' });

// المسارات (Endpoints)
// 1. مسار يجيب كل المنظمين
router.get("/", getPlanners);
router.post("/add-review", addPlannerReview);
// الجديد: مسار يجيب تفاصيل بلانر واحد بالـ ID
router.get("/:id", getPlannerDetails);

router.post("/", upload.fields([
  { name: 'image', maxCount: 1 },           // حقل الصورة الشخصية
  { name: 'projectImages', maxCount: 3 }    // حقل صور التنفيذات
]), createPlanner);

// 2. مسار يضيف منظم جديد (بيدعم رفع صورة واحدة باسم 'image')
//router.post("/", upload.single('image'), createPlanner);


module.exports = router;