const router = require("express").Router();
const { getSpecialEvents, getSpecialEventDetails, createSpecialEvent } = require("../controllers/specialEvent.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // عشان يرفع الصور في الفولدر بتاعها

// المسارات الخاصة بالـ Special Events
router.get("/", getSpecialEvents);
// اللينك: /api/special-events/:id
router.get("/:id", getSpecialEventDetails);
router.post("/", upload.single('image'), createSpecialEvent);


module.exports = router;
