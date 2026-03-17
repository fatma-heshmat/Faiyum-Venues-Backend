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
  }

});

module.exports = mongoose.model("EventOptions", eventOptionsSchema);