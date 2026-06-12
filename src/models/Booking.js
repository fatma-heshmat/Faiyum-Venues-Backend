const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    hallName: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
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
