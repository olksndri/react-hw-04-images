import css from "../styles.module.css";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onClick, onKeyDown}) => { 
    return (
        <>  
            {
                images.length !== 0 &&
                images.map(el => { 
                    return (
                        <li className={css.ImageGalleryItem} key={el.id} onKeyDown={onKeyDown}>
                              <a href={el.largeImageURL} onClick={onClick}>
                                <img src={el.webformatURL} alt=''/>
                              </a>
                         </li>   
                    )
                })
            }
        </>
    )
}


ImageGalleryItem.propTypes = {
    images: PropTypes.array.isRequired, 
    onClick:  PropTypes.func, 
    onKeyDown:  PropTypes.func, 
}