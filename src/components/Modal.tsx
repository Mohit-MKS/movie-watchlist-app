// src/components/Modal.tsx
import React, { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="model-component">
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
