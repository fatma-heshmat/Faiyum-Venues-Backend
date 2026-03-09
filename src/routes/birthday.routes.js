const router = require("express").Router();
const { 
    getBirthdays, 
    createBirthday, 
    getBirthdayDetails 
} = require("../controllers/birthday.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// جلب كل أعياد الميلاد
router.get("/", getBirthdays);

// إضافة عيد ميلاد جديد مع صورة
router.post("/", upload.single('image'), createBirthday);

// جلب تفاصيل عيد ميلاد محدد بالـ ID
router.get("/:id", getBirthdayDetails);

module.exports = router;

