const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    hallName: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,  
        required: true
    },
    planner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planner',  
        required: [true, 'برجاء اختيار منظم الحفلات (Planner)']
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
