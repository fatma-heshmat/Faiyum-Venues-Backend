const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Planner = require('../models/Planner');

// @desc    Create a new booking request (Customer)
const createBooking = asyncHandler(async (req, res) => {
    const { customerName, eventOptionId } = req.body;

    if (!customerName || !eventOptionId) {
        return res.status(400).json({ success: false, message: 'برجاء إرسال اسم الكاستمر والـ eventOptionId' });
    }

    const newBooking = await Booking.create({
        customerName,
        eventOption: eventOptionId
    });

    const populatedBooking = await Booking.findById(newBooking._id)
        .populate({
            path: 'eventOption',
            select: 'hallName plannerName bookingDate -_id'
        });

    res.status(201).json({ success: true, data: populatedBooking });
});

// @desc    جلب الحجوزات للداشبورد (Admin Dashboard)
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
        .populate({
            path: 'eventOption',
            select: 'hallName plannerName bookingDate -_id'
        });

    res.status(200).json({
        success: true,
        data: bookings
    });
});

module.exports = { createBooking, getAllBookings };



module.exports = { createBooking, getAllBookings };
