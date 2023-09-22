

import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  margin: 0 10px;
  cursor: pointer;
`;

const ConfirmationModal = ({ onCancel, onConfirm }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <p>Are you sure you want to cancel this appointment?</p>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ConfirmationModal;
