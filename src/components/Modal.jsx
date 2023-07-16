import css from '../styles.module.css' 
import PropTypes from 'prop-types';

export const Modal = ({ imgHref, modalOpen, onClickOverlay }) => {
    if (modalOpen) {
        return (
            <div className={css.Overlay} onClick={onClickOverlay}>
                <div className={css.Modal}>
                    <img src={imgHref} alt=""/>
                </div>
            </div>
            )
    }
}

Modal.propTypes = { 
    imgHref: PropTypes.string, 
    modalOpen: PropTypes.bool.isRequired, 
    onClickOverlay: PropTypes.func
}