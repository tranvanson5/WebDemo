import React, { useEffect, useState } from 'react';
import './imageSlide.css';

function ImageSlide({ time = 5000, size = 5, images = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, time);

    return () => clearInterval(intervalId); // Clear interval when component unmounts
  }, [images.length, time]);

  let preShowImages = [];
  if (images.length > 1) {
    // Calculate startIndex and endIndex based on size only if images.length > 1
    let startIndex, endIndex;
    if (images.length <= size) {
      startIndex = 0;
      endIndex = images.length - 1;
    } else {
      const halfSize = Math.floor(size / 2);
      startIndex = currentImageIndex - halfSize;
      endIndex = currentImageIndex + (size - halfSize) - 1;

      // Adjust start and end indices if they go beyond image array bounds
      if (startIndex < 0) {
        endIndex -= startIndex; // Adjust endIndex to keep the same size
        startIndex = 0;
      } else if (endIndex >= images.length) {
        startIndex -= endIndex - (images.length - 1); // Adjust startIndex to keep the same size
        endIndex = images.length - 1;
      }
    }
    preShowImages = images.slice(startIndex, endIndex + 1); // Extract images based on startIndex and endIndex
  } else if (images.length === 1) {
    // Handle the case when images array contains only one image
    preShowImages = images;
  }

  return (
      <div className='imageslide-container'>
        <div className='image-container'>
          {images.length > 0 && (
              <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
          )}
        </div>
        <div className='pre-show-container'>
          {preShowImages.map((image, index) => {
            const preImageIndex = index; // Since there's only one image, preImageIndex will be 0
            const isCurrentPreImage = currentImageIndex === preImageIndex;
            return (
                <div className={`pre-image ${isCurrentPreImage ? 'highlight-red' : 'highlight-black'}`} key={index}>
                  <img
                      src={image}
                      alt={`Pre-slide ${preImageIndex + 1}`}
                      onClick={() => setCurrentImageIndex(preImageIndex)}
                  />
                </div>
            );
          })}
        </div>
      </div>
  );
}

export default ImageSlide;
