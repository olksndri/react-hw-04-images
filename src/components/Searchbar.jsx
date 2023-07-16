import css from "../styles.module.css"
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
    return ( 
        <>
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={onSubmit}>
                    <button type="submit" className={css['SearchForm-button']} disabled={(onSubmit === null) ? true : false}>
                        <span className={css['SearchForm-button-label ']}>Search</span>
                    </button>
                    <input
                    className={css['SearchForm-input']}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        </>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
}