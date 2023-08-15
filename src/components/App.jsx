import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './Servicios/Api';
import './styles.css';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSearchSubmit = async newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    fetchImagesForQuery(newQuery, 1);
  };

  const fetchImagesForQuery = async (query, currentPage) => {
    try {
      setIsLoading(true);
      const newImages = await fetchImages(query, currentPage);
      setImages(prevImages => [...prevImages, ...newImages]);
      setPage(currentPage + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchImagesForQuery(query, page);
  };

  const handleImageClick = largeImageURL => {
    setShowModal(true);
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            largeImageURL={image.webformatURL}
            alt={image.tags}
            onClick={() => handleImageClick(image.largeImageURL)}
          />
        ))}
      </ImageGallery>
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal largeImageURL={selectedImage} onClose={handleCloseModal} alt={"show Modal"} />
      )}
    </div>
  );
}

export default App;




