import { useState } from 'react';
import styles from './styles.module.scss';

export default function Board() {

    const [IsX, setIsX] = useState(true);

    const board = [null, null, null, null, null, null, null, null, null];

    return (
        <div className={styles.container}>
            {
                board.map((cell, index) => {
                    return (
                        <div key={index} className={styles.cell}
                            style={{ color: IsX ? "red" : "black" }}
                        >{
                                cell !== null ? cell : ""
                            }</div>
                    )
                })
            }
        </div>
    )
}