const express = require('express');
const router = express.Router();
const birthdayController = require("../controllers/birthday.controller");

const multer = require('require' in global ? 'multer' : 'multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", birthdayController.getBirthdays);
router.get("/:id", birthdayController.getBirthdayDetails);
router.post("/", auth, admin, upload.single('image'), birthdayController.createBirthday);
router.put("/:id", auth, admin, upload.single('image'), birthdayController.updateBirthday);
router.delete("/:id", auth, admin, birthdayController.deleteBirthday);

module.exports = router;
