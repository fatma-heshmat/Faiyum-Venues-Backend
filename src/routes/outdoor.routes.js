const express = require('express');
const router = express.Router();
const outdoorController = require("../controllers/outdoor.controller");
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

router.get("/", outdoorController.getOutdoors);
router.get("/:id", outdoorController.getOutdoorDetails);
router.post("/", auth, admin, upload.single('image'), outdoorController.createOutdoor);
router.put("/:id", auth, admin, upload.single('image'), outdoorController.updateOutdoor);
router.delete("/:id", auth, admin, outdoorController.deleteOutdoor);

module.exports = router;
