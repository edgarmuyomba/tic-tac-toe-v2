import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import errorImage from '../../assets/error_image.jpg';
import { Blurhash } from 'react-blurhash';
import { useNavigate } from 'react-router-dom';

export default function ErrorElement() {

    const [imgLoaded, setImgLoaded] = useState(false);
 
    useEffect(() => {
        const img = new Image();
        img.onload = () => setImgLoaded(true);
        img.src = errorImage;
    }, [errorImage])

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/', { replace: true });
        window.location.reload();
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <div className={styles.header}>
                    Oops!
                </div>
                <p className={styles.sub}>
                    Something went wrong
                </p>
                    <button onClick={handleClick}>
                        Back to home
                    </button>
            </div>
            <div className={styles.image}>
                {
                    !imgLoaded &&
                    <Blurhash
                        hash='LGQcn{%M9F~qRjxuRjof-;%MofD%'
                        height="100%"
                        width="100%"
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                    />
                }
                {
                    imgLoaded && <img src={errorImage} alt="" />
                }
            </div>
        </div>
    );
}