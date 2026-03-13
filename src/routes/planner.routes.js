const router = require("express").Router();
const { getPlanners, createPlanner } = require("../controllers/planner.controller");
const multer = require('multer');

// إعداد المخزن المؤقت للصور (لو حبيتي ترفعي ملفات)
const upload = multer({ dest: 'uploads/' });

// المسارات (Endpoints)
// 1. مسار يجيب كل المنظمين
router.get("/", getPlanners);
// الجديد: مسار يجيب تفاصيل بلانر واحد بالـ ID
router.get("/:id", getPlannerDetails);

router.post("/", upload.fields([
  { name: 'image', maxCount: 1 },           // حقل الصورة الشخصية
  { name: 'projectImages', maxCount: 3 }    // حقل صور التنفيذات
]), createPlanner);
router.post("/add-review", addPlannerReview);

module.exports = router;

