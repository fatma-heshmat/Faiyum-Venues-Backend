const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');

// @desc    Create a new booking request (Customer)
// @route   POST /api/bookings
// @access  Private (لازم يكون عامل لوجين ويعدي من الـ protect middleware)
const createBooking = asyncHandler(async (req, res) => {
    // الكاستمر بيبعت بس اسم القاعة والتاريخ، مش بيبعت اسمه لأننا عارفين هو مين من اللوجين
    const { hallName, bookingDate } = req.body;

    if (!hallName || !bookingDate) {
        res.status(400);
        throw new Error('Please fill all fields: hallName, bookingDate');
    }

    // تشيك لو القاعة محجوزة في نفس التاريخ ومقبولة قبل كده
    const existingBooking = await Booking.findOne({ hallName, bookingDate, status: 'accepted' });
    if (existingBooking) {
        res.status(400);
        throw new Error('This hall is already booked for this date');
    }

    // إنشاء الحجز وربطه بـ ID اليوزر اللي عامل لوجين حالياً أوتوماتيك
    const booking = await Booking.create({
        customerId: req.user._id, // اتسحب من الـ protect middleware تلقائياً
        hallName,
        bookingDate
    });

    res.status(201).json({
        success: true,
        data: booking
    });
});

// @desc    Get all booking requests (Admin)
// @route   GET /api/bookings
// @access  Private (Admin Only)
const getAllBookings = asyncHandler(async (req, res) => {
    // بيجيب كل الطلبات ويرتبها من الأحدث للأقدم
    // وبنعمل populate لـ customerId عشان يرجع اسم العميل وإيميله للآدمن في الداشبورد
    const bookings = await Booking.find()
        .populate('customerId', 'name email') // تأكدي إن الموديل بتاع Booking فيه حقل اسمه customerId ومربوط بـ User
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings
    });
});

// @desc    Update booking status (Admin Accept/Reject)
// @route   PUT /api/bookings/:id
// @access  Private (Admin Only)
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // الآدمن بيبعت: {"status": "accepted"} أو "rejected"

    // التأكد إن الحالة المبعوتة صحيحة
    if (!status || !['accepted', 'rejected'].includes(status)) {
        res.status(400);
        throw new Error('Please provide a valid status: accepted or rejected');
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        res.status(404);
        throw new Error('Booking request not found');
    }

    // تحديث الحالة
    booking.status = status;
    await booking.save();

    res.status(200).json({
        success: true,
        message: `Booking has been ${status}`,
        data: booking
    });
});

module.exports = {
    createBooking,
    getAllBookings,
    updateBookingStatus
};