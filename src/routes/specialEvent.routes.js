const router = require("express").Router();
const { getSpecialEvents, createSpecialEvent } = require("../controllers/specialEvent.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // عشان يرفع الصور في الفولدر بتاعها

// المسارات الخاصة بالـ Special Events
router.get("/", getSpecialEvents);
router.post("/", upload.single('image'), createSpecialEvent);

module.exports = router;