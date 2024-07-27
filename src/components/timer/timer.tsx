import styles from './styles.module.scss';

export default function Timer() {
    return (
        <div className={styles.container}>
            <p className={styles.time}>
                0:10
            </p>
        </div>
    );
}