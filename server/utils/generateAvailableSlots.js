const Doctor = require('../models/Doctor');
const AvailableSlot = require('../models/AvailableSlot');

const generateAvailableSlots = async () => {
  try {
    // Get all doctors
    const doctors = await Doctor.find();
    
    // Generate slots for each doctor
    for (const doctor of doctors) {
      for (let hour = 8; hour <= 16; hour++) {
        const time = `${hour < 10 ? '0' : ''}${hour}:00 AM`;
        for (let day = 1; day <= 7; day++) {
          const availableSlot = new AvailableSlot({
            doctor: doctor._id,
            date: new Date().setDate(new Date().getDate() + day),
            time,
          });
          await availableSlot.save();
        }
      }
    }
  } catch (error) {
    console.error('Error generating available slots:', error);
  }
};

module.exports = { generateAvailableSlots };
