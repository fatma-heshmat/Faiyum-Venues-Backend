const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');

// @desc    Create a new booking request (Customer)
const createBooking = asyncHandler(async (req, res) => {
    const { customerName, hallName, bookingDate } = req.body;

    if (!customerName || !hallName || !bookingDate) {
        res.status(400);
        throw new Error('Please fill all fields: customerName, hallName, bookingDate');
    }
 
    const existingBooking = await Booking.findOne({ 
        hallName: hallName, 
        bookingDate: new Date(bookingDate) 
    });

    if (existingBooking) {
        res.status(400);
        throw new Error('عفواً، هذه القاعة محجوزة بالفعل في هذا التاريخ!');
    }

    const booking = await Booking.create({
        customerName, 
        hallName,
        bookingDate
    });

    res.status(201).json({
        success: true,
        data: booking
    });
});
// @desc    Get all booking requests (Admin)
const getAllBookings = asyncHandler(async (req, res) => {
    // بيجيب الطلبات عل طول من غير لفة الـ populate المعقدة
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// @desc    Update booking status (Admin Accept/Reject)
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        res.status(404);
        throw new Error('Booking request not found');
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
        success: true,
        data: booking
    });
});

module.exports = { createBooking, getAllBookings, updateBookingStatus };
