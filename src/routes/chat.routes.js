const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// لما الفرونت إند يبعت POST ريكويست، هيشغل الفانكشن بتاعة الشات
router.post('/', chatController.handleChat);

module.exports = router;