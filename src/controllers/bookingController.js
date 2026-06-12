const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Planner = require('../models/Planner');

// @desc    Create a new booking request (Customer)
// @desc    Create a new booking request (Customer)
const createBooking = asyncHandler(async (req, res) => {
    // المرة دي الفرنت-إند هيبعت لنا الـ plannerName (الاسم نفسه)
    const { customerName, hallName, bookingDate, plannerName } = req.body;

    if (!customerName || !hallName || !bookingDate || !plannerName) {
        return res.status(400).json({
            success: false,
            message: 'برجاء ملء جميع الحقول المطلوبة بما فيها اسم الـ Planner'
        });
    }

    // 🔎 الحركة السحرية: هنروح ندور في جدول البلانرز على بلانر عنده نفس الاسم ده
    const plannerExists = await Planner.findOne({ name: plannerName });
    
    // لو ملحقناش بلانر بالاسم ده في الداتابيز، هنرفض الحجز
    if (!plannerExists) {
        return res.status(404).json({
            success: false,
            message: 'عفواً، منظم الحفلات (Planner) المختار غير موجود في النظام!'
        });
    }

    // التأكد إن القاعة مش محجوزة في نفس اليوم
    const existingBooking = await Booking.findOne({ hallName, bookingDate });
    if (existingBooking) {
        return res.status(400).json({
            success: false,
            message: 'عفواً، هذه القاعة محجوزة بالفعل في هذا التاريخ!'
        });
    }

    // إنشاء الحجز وبناخد الـ ID بتاع البلانر اللي لقيناه أوتوماتيك ونخزنه
    const booking = await Booking.create({
        customerName, 
        hallName,
        bookingDate,
        planner: plannerExists._id // السيرفر هنا ذكي وبياخد الـ ID لوحده من الاسم اللي دورنا بيه
    });

 const populatedBooking = await Booking.findById(newBooking._id).populate('planner', 'name');

    res.status(201).json({
        success: true,
        data: populatedBooking
    });
});

// @desc    Get all bookings (Admin Dashboard)
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({}).populate('planner', 'name'); 
    
    res.status(200).json({
        success: true,
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
