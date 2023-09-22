// timeSlots.js

const generateTimeSlots = () => {
    const timeSlots = [];
    const startTime = 8; // Start time in 24-hour format (8:00 AM)
    const endTime = 16;  // End time in 24-hour format (4:00 PM)
  
    for (let i = startTime; i <= endTime; i++) {
      const hour = String(i).padStart(2, '0'); // Pad single-digit hours with leading zero
      timeSlots.push(`${hour}:00 AM`);
    }
  
    return timeSlots;
  };
  
  module.exports = { generateTimeSlots };
  