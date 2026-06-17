const router = require("express").Router();
const { getVenues, createVenue, getVenueDetails } = require("../controllers/venue.controller");
const multer = require('multer');

//const upload = multer({ dest: 'uploads/' });

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

router.get("/", getVenues);
router.post("/", upload.single('image'), createVenue);
router.get("/:id", getVenueDetails);

module.exports = router;
