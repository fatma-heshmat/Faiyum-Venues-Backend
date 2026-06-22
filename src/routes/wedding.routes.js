const express = require('express');
const router = express.Router();
const weddingController = require("../controllers/wedding.controller");
const upload = require('../middleware/upload'); 
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get('/', weddingController.getWeddings);
router.get('/:id', weddingController.getWeddingDetails);

router.post('/', auth, admin, upload.single('image'), weddingController.createWedding);
router.put('/:id', auth, admin, upload.single('image'), weddingController.updateWedding);
router.delete('/:id', auth, admin, weddingController.deleteWedding);

module.exports = router;
module.exports = router;
