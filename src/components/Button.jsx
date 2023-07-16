import css from "../styles.module.css"
import PropTypes from 'prop-types';

export const Button = ({ onLoad }) => { 
    return (
        <>  
            <div className={css['Button-wrapper']}>
                <button type="button" className={css.Button} onClick={onLoad}>Load more</button>
            </div>
        </>
    )
}

Button.propTypes = {
    onLoad: PropTypes.func 
}