import React from 'react';

const Modal = ({ src, onClose  }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={src} alt="" />
      </div>
    </div>
  );
};

export default Modal;
