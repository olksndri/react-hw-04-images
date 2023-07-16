import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { getImages } from 'js/getImages';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [input, setInput] = useState(''); 
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(0); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); 
  const [imgSrc, setImgSrc] = useState(''); 

  const onSubmit = (evt) => { 
    evt.preventDefault();
    setInput(evt.target.firstElementChild.nextSibling.value); 
    setPage(1); 
    setIsLoading(true); 
    setImages([]); 
    setError(null); 
  }

  const onClickImg = (evt) => {
    evt.preventDefault();
    setModalOpen(true); 
    setImgSrc(evt.currentTarget.href); 
  }

  const onKeyDown = (evt) => { 
    if (evt.key.toLowerCase() === 'escape') {
      setModalOpen(false); 
      setImgSrc('');
    }
  }

  const onClickOverlay = () => {
    setModalOpen(false); 
    setImgSrc(''); 
  }

  const onLoad = () => { 
    setIsLoading(true); 
    setPage(page + 1)
  }

  useEffect(() => {  
    if (isLoading) {
      getImages(input, page).then((response) => {
        setImages([...images, ...response]);
        if (response.length !== 12) {
          setError("END");
        }
      })
        .catch((error) => setError(error))
        .finally(setIsLoading(false));
    }
  }, [isLoading, images, input, page])

  return (
    <>
      <Searchbar
        onSubmit={isLoading ? null : onSubmit}
      >
      </Searchbar>
      <ImageGallery>
        <ImageGalleryItem
          images={images}
          onClick={modalOpen ? null : onClickImg}
          onKeyDown={modalOpen ? onKeyDown : null}
        >
        </ImageGalleryItem>
      </ImageGallery>
      {(error !== null) &&
        <p style={{ textAlign: 'center', }}>
          { (error === "END" && images.length === 0) ?
            "No photo by your request" :
            (error === "END" ) ?
            "These are all images found for your request" :
            "Ooops, something get wrong..."
          }
        </p>
      }
      {isLoading && <Loader></Loader>}
      {error === null && !isLoading && images.length > 0 &&
        <Button onLoad={onLoad}></Button>
      }
      <Modal
        imgHref={imgSrc}
        modalOpen={modalOpen}
        onClickOverlay={modalOpen ? onClickOverlay : null}></Modal>
    </>
  )
}