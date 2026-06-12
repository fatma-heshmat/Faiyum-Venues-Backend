const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Planner = require('../models/Planner');
const EventOption = require('../models/eventOptions');

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

// @desc    عرض جدول الحجوزات في الداشبورد لكل أنواع الأماكن (الآدمن)
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
        .populate({
            path: 'eventOption',
            select: 'plannerName eventDate place placeType -_id', //
            populate: {
                path: 'place', // 👈 المونجو هنا هتروح للموديل الصح لوحدها ديناميكياً!
                select: 'name -_id' // هات اسم المكان (اتأكدي إن حقل الاسم في الموديلات الأربعة اسمه name أو وحدوه)
            }
        });

    res.status(200).json({
        success: true,
        data: bookings
    });
});

// @desc    Update booking status (Admin)
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
        return res.status(404).json({ success: false, message: 'الحجز غير موجود' });
    }
    
    booking.status = status || booking.status;
    await booking.save();
    res.status(200).json({ success: true, data: booking });
});

module.exports = { createBooking, getAllBookings , updateBookingStatus};




