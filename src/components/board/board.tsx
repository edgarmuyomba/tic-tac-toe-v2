import { useState } from 'react';
import styles from './styles.module.scss';

export default function Board() {

    const [IsX, setIsX] = useState(true);

    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className={styles.container}>
            {
                board.map((cell) => {
                    return (
                        <div key={cell} className={styles.cell}
                            style={{ color: IsX ? "red" : "black" }}
                        >X</div>
                    )
                })
            }
        </div>
    )
}