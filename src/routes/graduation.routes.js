const router = require("express").Router();
const { getGraduations, getGraduationDetails ,createGraduation } = require("../controllers/graduation.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", getGraduations);
router.get("/:id", getGraduationDetails);
router.post("/", upload.single('image'), createGraduation);


module.exports = router;
