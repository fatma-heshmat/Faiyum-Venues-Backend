const router = require("express").Router();
const { getVenues, createVenue } = require("../controllers/venue.controller");
const multer = require('multer');

// أبسط إعداد للرفع (على السيرفر مباشرة)
const upload = multer({ dest: 'uploads/' });

router.get("/", getVenues);
router.post("/", upload.single('image'), createVenue);

module.exports = router;