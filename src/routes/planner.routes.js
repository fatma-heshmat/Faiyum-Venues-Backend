const router = require("express").Router();
const { getPlanners, createPlanner , getPlannerDetails, addPlannerReview} = require("../controllers/planner.controller");
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get("/", getPlanners);
router.post("/add-review", addPlannerReview);
router.get("/:id", getPlannerDetails);

router.post("/", upload.fields([
  { name: 'image', maxCount: 1 },           
  { name: 'projectImages', maxCount: 3 }    
]), createPlanner);

module.exports = router;



