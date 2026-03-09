const router = require("express").Router();
const { getBirthdays, createBirthday , getBirthdayDetails } = require("../controllers/birthday.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", getBirthdays);
router.post("/", upload.single('image'), createBirthday);
router.get("/:id", getBirthdayDetails); // مسار الـ ID

module.exports = router;
