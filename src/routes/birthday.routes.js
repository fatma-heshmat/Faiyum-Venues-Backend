const router = require("express").Router();
const { getBirthdays, createBirthday } = require("../controllers/birthday.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", getBirthdays);
router.post("/", upload.single('image'), createBirthday);

module.exports = router;