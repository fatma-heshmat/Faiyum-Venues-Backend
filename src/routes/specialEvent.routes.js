const router = require("express").Router();
const { getSpecialEvents, getSpecialEventDetails, createSpecialEvent } = require("../controllers/specialEvent.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });  

router.get("/", getSpecialEvents);
router.get("/:id", getSpecialEventDetails);
router.post("/", upload.single('image'), createSpecialEvent);


module.exports = router;
