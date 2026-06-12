const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');

router.route('/')
    .post(createBooking)      
    .get(getAllBookings);     

router.route('/:id')
    .put(updateBookingStatus); 

module.exports = router;
