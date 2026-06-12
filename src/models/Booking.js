const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // كنا عاملين الحقل ده eventOptions قبل كده، فتقدري تربطيه بـ ID القاعة
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wedding', // مربوط بجدول القاعات اللي عملناه
        required: true
    },
    bookingDate: {
        type: Date,
        required: [true, 'Please add the booking date']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);