const router = require("express").Router();
const { getPlanners, createPlanner } = require("../controllers/planner.controller");
const multer = require('multer');

// إعداد المخزن المؤقت للصور (لو حبيتي ترفعي ملفات)
const upload = multer({ dest: 'uploads/' });

// المسارات (Endpoints)
// 1. مسار يجيب كل المنظمين
router.get("/", getPlanners);

// 2. مسار يضيف منظم جديد (بيدعم رفع صورة واحدة باسم 'image')
router.post("/", upload.single('image'), createPlanner);

module.exports = router;