const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  state: {
   type:mongoose.Schema.Types.ObjectId,
    ref: "State" 
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  include: {
    type: [String],
    default: []
  },
  notIncludes: {
    type: [String],
    default: []
  },
  districtname: {
    type: String
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  selectedImages: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model("Destination", destinationSchema); // Use singular form
