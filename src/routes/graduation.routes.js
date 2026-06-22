const express = require('express');
const router = express.Router();
const graduationController = require("../controllers/graduation.controller");
const multer = require('multer');
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

router.get("/", graduationController.getGraduations);
router.get("/:id", graduationController.getGraduationDetails);

router.post("/", auth, admin, upload.single('image'), graduationController.createGraduation);
router.put("/:id", auth, admin, upload.single('image'), graduationController.updateGraduation);
router.delete("/:id", auth, admin, graduationController.deleteGraduation);

module.exports = router;
