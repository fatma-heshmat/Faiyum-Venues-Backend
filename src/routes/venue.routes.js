const router = require("express").Router();
// سيبنا الدالة اللي بتعرض بس ومسحنا createVenue عشان ميعملش Error
const { getVenues , createVenue} = require("../controllers/venue.controller");
const upload = require('../middleware/upload'); // لازم تنادي على الميدل وير بتاع الصور

// 1. رابط العرض (لليوزر والبوست مان)
router.get("/", getVenues);
// ضيفي السطر ده تاني مؤقتاً
router.post("/", upload.single('image'), createVenue);
// النقطتين :id دي معناها إن الجزء ده متغير (بياخد أي ID قاعة)
router.get("/:id", getVenueDetails);

module.exports = router;
