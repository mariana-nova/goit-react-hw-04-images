import React from 'react';

const ImageGalleryItem = ({  alt , onClick, largeImageURL }) => {
  return (
    <li className="gallery-item" onClick = {onClick}>
      <img  src={largeImageURL} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
