import { useState } from 'react';
import Timer from '../timer/timer';
import styles from './styles.module.scss';
import snoopy from '../../assets/snoopy_thinking.gif';
import bear from '../../assets/bear_thinking.gif';

export default function Header() {
    const [IsX, setIsX] = useState(true);
    const [YourTurn, setYourTurn] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.you}  style={{ opacity: YourTurn ? 1 : 0.2 }}>
                {
                    IsX ?
                        (
                            <p className={styles.title}>
                                You X
                            </p>
                        )
                        :
                        (
                            <p className={styles.title}>
                                You O
                            </p>
                        )
                }
                <div className={styles.gif}>
                    {
                        IsX ? (
                            <img src={snoopy} alt="snoopy_thinking" />
                        ) : (
                            <img src={bear} alt="bear_thinking" />
                        )
                    }
                </div>
            </div>
            <Timer />
            <div className={styles.opponent}  style={{ opacity: YourTurn ? 0.2 : 1 }}>
                {
                    IsX ?
                        (
                            <p className={styles.title}>
                                Opponent O
                            </p>
                        )
                        :
                        (
                            <p className={styles.title}>
                                Opponent X
                            </p>
                        )
                }
                <div className={styles.gif}>
                    {
                        IsX ? (
                            <img src={bear} alt="bear_thinking" />
                        ) : (
                            <img src={snoopy} alt="snoopy_thinking" />
                        )
                    }</div>
            </div>
        </div>
    )
}