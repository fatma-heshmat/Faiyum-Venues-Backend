const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'برجاء إدخال اسم العميل']
    },
    eventOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventOptions', 
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);











