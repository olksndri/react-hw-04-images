import { Audio } from 'react-loader-spinner'; 
import css from '../styles.module.css'

export const Loader = () => { 
    return (
        <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass={css['Loader-wrapper']}
        />
    )
}

