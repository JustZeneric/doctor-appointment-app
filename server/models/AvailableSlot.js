const mongoose = require('mongoose');

const availableSlotSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Referencing the Doctor model
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
});

const AvailableSlot = mongoose.model('AvailableSlot', availableSlotSchema);

module.exports = AvailableSlot;
