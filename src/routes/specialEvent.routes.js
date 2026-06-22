const express = require('express');
const router = express.Router();
const specialEventController = require("../controllers/specialEvent.controller");

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

router.get("/", specialEventController.getSpecialEvents);
router.get("/:id", specialEventController.getSpecialEventDetails);
router.post("/", auth, admin, upload.single('image'), specialEventController.createSpecialEvent);
router.put("/:id", auth, admin, upload.single('image'), specialEventController.updateSpecialEvent);
router.delete("/:id", auth, admin, specialEventController.deleteSpecialEvent);

module.exports = router;
