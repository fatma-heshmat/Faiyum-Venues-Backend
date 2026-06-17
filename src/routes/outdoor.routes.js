const router = require("express").Router();
const { getOutdoors, createOutdoor, getOutdoorDetails } = require("../controllers/outdoor.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", getOutdoors);
router.post("/", upload.single('image'), createOutdoor);
router.get("/:id", getOutdoorDetails);

module.exports = router;
