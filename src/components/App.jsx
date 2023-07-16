import React, { Component } from 'react'; 
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { getImages } from 'js/getImages';
import { Loader } from './Loader';
import { Modal } from './Modal';

export class App extends Component {
  state = { 
    input: "", 
    images: [],
    page: 0, 
    isLoading: false,
    error: null,
    modalOpen: false,
    imgSrc: '', 
  }
  
  onSubmit = evt => { 
    evt.preventDefault();
    this.setState({
      input: evt.target.firstElementChild.nextSibling.value,
      page: 1,
      isLoading: true,
      images: []
    }); 
  }

  onLoad = () => { 
    this.setState({ isLoading: true });
    this.setState((state => { 
      return { page: state.page + 1}
    }))
  }

  onClickImg = (evt) => {
    evt.preventDefault();
    this.setState({ modalOpen: true, imgSrc: evt.currentTarget.href });
  }

  onClickOverlay = (evt) => {
    this.setState({ modalOpen: false, imgSrc: '', }); 
  }

  onKeyDown = (evt) => {
    if (evt.key.toLowerCase() === 'escape') this.setState({ modalOpen: false, imgSrc: '', }); 
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoading) {
      const inputValue = this.state.input; 
      const page = this.state.page;

        getImages(inputValue, page)
        .then((response) => {
          this.setState((state) => { 
            if (response.length === 12) {
              return { images: [...state.images, ...response] }
            } else {
              return { images: [...state.images, ...response], error: "END"}
            }
          })
        })
        .catch((error) => this.setState({ error: error }))
        .finally(this.setState({ isLoading: false }));
     
    }
  } 

  render() { 
    const { images, isLoading, error, modalOpen, imgSrc} = this.state; 

    return (
      <>
        <Searchbar
          onSubmit={isLoading ? null : this.onSubmit}
        >
        </Searchbar>
        <ImageGallery>
          <ImageGalleryItem
            images={images}
            onClick={modalOpen ? null : this.onClickImg}
            onKeyDown={modalOpen ? this.onKeyDown : null}
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
          <Button onLoad={this.onLoad}></Button>
        }
        <Modal
          imgHref={imgSrc}
          modalOpen={modalOpen}
          onClickOverlay={modalOpen ? this.onClickOverlay : null}></Modal>
      </>
    )
  }
};
