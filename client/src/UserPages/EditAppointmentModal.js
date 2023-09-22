import React, { useState } from 'react';
import styled from 'styled-components';
import '../css/DashboardEdit.css'; 

const EditAppointmentModal = ({ appointment, onSave, onClose }) => {
  const [editedDescription, setEditedDescription] = useState(appointment.description);

  const handleSave = () => {
    onSave({ description: editedDescription });
  };

  return (
    <div className="modal-container">
    <div className="modal-content">
      <h3>Edit Appointment</h3>
      <form>
      <div className="form-group">
  <label className="label">Description:</label>
  <textarea
    className="input description-input"
    style={{ height: '100px', resize: 'vertical' }}
    value={editedDescription}
    onChange={(e) => setEditedDescription(e.target.value)}
  />
</div>


        <button type="button" className="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default EditAppointmentModal;
