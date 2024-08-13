import { useEffect, useState } from "react";
import { GameEvent } from "../../utils/constants";
import styles from "./styles.module.scss";
import snoopy_winner from "../../assets/snoopy_winner.gif";
import snoopy_loss from "../../assets/snoopy_loss.gif";
import bear_winner from "../../assets/bear_winner.gif";
import bear_loss from "../../assets/bear_loss.gif";
import snoopy_draw from "../../assets/snoopy_draw.gif";
import bear_draw from "../../assets/bear_draw.gif";
import { Link } from "react-router-dom";

export default function GameOver({ gameEvent, eventData, display }: { gameEvent: GameEvent, eventData: any, display: boolean }) {

    const [style, setStyle] = useState<string>("");
    const [mark, setMark] = useState<String | null>(null);
    const [gif, setGif] = useState<string>("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const player_mark = localStorage.getItem("mark");
        // const player_mark = "X";

        if (player_mark) {
            setMark(player_mark);
        }
    }, []);

    useEffect(() => {
        if (!mark) return;

        switch (gameEvent) {
            case GameEvent.Win:
                // are you the winner or the loser?
                if (mark === eventData.winner) {
                    setStyle(styles.you_win);
                    setMessage("You Win!");
                    if (mark === 'X') {
                        setGif(snoopy_winner);
                    } else setGif(bear_winner);
                } else {
                    setStyle(styles.you_lose);
                    setMessage("You Lose!");
                    if (mark === 'X') {
                        setGif(snoopy_loss);
                    } else setGif(bear_loss);
                }
                break;
            case GameEvent.Draw:
                setStyle(styles.draw);
                setMessage("Draw!!!");
                if (mark === 'X') {
                    setGif(snoopy_draw);
                } else setGif(bear_draw);
                break;
            case GameEvent.Error:
                break;
        }
    }, [gameEvent, eventData, mark])


    return (
        <div style={{ display: display ? 'flex' : 'none' }} className={`${styles.container} ${style}`}>
            <div className={styles.gif} style={{ backgroundImage: `url(${gif})`}}>
                {/* <img src={gif} alt="gif" /> */}
            </div>
            <div className={styles.header}>
                <p className={styles.text}>
                    Game Over
                </p>
            </div>
            <div className={styles.message}>
                <p className={styles.text}>
                    {message}
                </p>
            </div>
            <div className={styles.buttons}>
                <Link to="/">
                    {/* <div className={styles.button}> */}
                        Back to home
                    {/* </div> */}
                </Link>
            </div>
        </div>

    )
}

