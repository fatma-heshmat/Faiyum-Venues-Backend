const mongoose = require("mongoose");

const eventOptionsSchema = new mongoose.Schema({

  musicType: {
    type: [String]
  },

  menuType: {
    type: String,
    enum: ["set menu", "open buffet"]
  },

  drinks: {
    type: Boolean,
    default: false
  },

  meals: {
    type: Boolean,
    default: false
  },

  dessert: {
    type: Boolean,
    default: false
  },
   
  cakeType: {
    type: String,
    enum: ["wedding cake", "birthday cake", "graduation cake"]
  },
  // الحقل الجديد مع الفالديشن بالإنجليزي
  eventDate: {
    type: Date,
    required: [true, "Event date is required"],
    validate: {
      validator: function(value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return value >= today;
      },
      message: "Event date cannot be in the past. Please select a future date."
    }
  }
});

module.exports = mongoose.model("EventOptions", eventOptionsSchema);
