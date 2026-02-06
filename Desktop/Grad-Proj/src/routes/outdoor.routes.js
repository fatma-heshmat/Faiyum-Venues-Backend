const router = require("express").Router();
const { getOutdoors, createOutdoor } = require("../controllers/outdoor.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", getOutdoors);
router.post("/", upload.single('image'), createOutdoor);

module.exports = router;