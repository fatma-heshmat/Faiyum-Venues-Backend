const router = require("express").Router();
const { getVenues, createVenue, getVenueDetails , updateVenue, deleteVenue} = require("../controllers/venue.controller");
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
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", getVenues);
router.post("/", auth, admin, upload.single('image'), createVenue);
router.get("/:id", getVenueDetails);
router.put(
  "/:id",
  auth,
  admin,
  upload.single("image"),
  updateVenue
);
router.delete(
  "/:id",
  auth,
  admin,
  deleteVenue
);


module.exports = router;
