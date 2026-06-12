const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');

// استدعي الـ Middleware بتاع الحماية اللي إنتي كاتباه في المشروع (تأكدي من مساره)
const { protect, admin } = require('../middleware/errorMiddleware'); 

// الكاستمر لازم يكون عامل لوجن عشان يعمل بوست (protect)
// والآدمن لازم يكون آدمن وعامل لوجن عشان يشوف كل الطلبات (protect, admin)
router.route('/')
    .post(protect, createBooking)      
    .get(protect, admin, getAllBookings);     

router.route('/:id')
    .put(protect, admin, updateBookingStatus); // الآدمن بس اللي يقبل ويرفض

module.exports = router;