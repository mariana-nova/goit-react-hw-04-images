import React from 'react';

const Modal = ({  onClose, largeImageURL, alt  }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={largeImageURL} alt= {alt} />
      </div>
    </div>
  );
};

export default Modal;
