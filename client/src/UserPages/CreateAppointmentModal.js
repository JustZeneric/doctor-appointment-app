import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'; 


const CreateAppointmentModal = ({
  onClose,
  onSave,
  availableSlots,
  selectedDoctor,
}) => {
  const [formData, setFormData] = useState({
    doctorName: '',
    patientName: '',
    date: '',
    time: '',
    description: '',
  });

  useEffect(() => {
    if (selectedDoctor) {
      setFormData({ ...formData, doctorName: selectedDoctor.name });
    }
  }, [selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the changed field is 'date', format it
    if (name === 'date') {
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Create Appointment</h2>
        <form onSubmit={handleSubmit}>
          {selectedDoctor && (
            <div>
              <strong>Doctor Name:</strong> {selectedDoctor.name}
            </div>
          )}
          <div>
            <label>Patient Name:</label>
            <input class="patient"
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
  <label>Date:</label>
  <input class="date"
    type="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    required
  />
</div>
          <div>
            <label>Time:</label>
            <select class="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select a Time</option>
              {availableSlots.map((slot) => (
                <option key={slot._id} value={slot.time}>
                  {slot.time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Description:</label>
            <textarea class="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Save</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;
