/* import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './Servicios/Api';
import './styles.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  handleSearchSubmit = async query => {
    await this.setState({ query, page: 1, images: [] });
    this.fetchImages();
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const newImages = await fetchImages(query, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
      }));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal:  null });
  };

  render() {
    const { images, isLoading, showModal,  } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              largeImageURL={image.webformatURL}
              alt = {image.tags}
              onClick={() => this.handleImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {showModal && (
          <Modal  largeImageURL =  {showModal}  onClose={this.handleCloseModal} alt={"show Modal"} />
        )}
      </div>
    );
  }
}

export default App; */


import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (query === '') return;

    fetchImages(query, page)
      .then(newImages => {
        setImages(prevImages => [...prevImages, ...newImages]);
        setPage(prevPage => prevPage + 1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleSearchSubmit = async newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setIsLoading(true);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageURL => {
    setSelectedImage(largeImageURL);
    setShowModal(true);
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
