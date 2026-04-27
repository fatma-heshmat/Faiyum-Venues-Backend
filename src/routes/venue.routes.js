const router = require("express").Router();
const { getVenues, createVenue, getVenueDetails } = require("../controllers/venue.controller");
const multer = require('multer');

// أبسط إعداد للرفع (على السيرفر مباشرة)
//const upload = multer({ dest: 'uploads/' });

const path = require('path');

// إعداد متطور للمولتير عشان يحفظ الصور بامتدادها الصح
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // بيحفظ الصورة باسم فريد مع الامتداد الأصلي بتاعها
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get("/", getVenues);
router.post("/", upload.single('image'), createVenue);
// النقطتين :id دي معناها إن الجزء ده متغير (بياخد أي ID قاعة)
router.get("/:id", getVenueDetails);

module.exports = router;
