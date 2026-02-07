const router = require("express").Router();
const { getGraduations, createGraduation } = require("../controllers/graduation.controller");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get("/", getGraduations);
router.post("/", upload.single('image'), createGraduation);

module.exports = router;