import { useEffect, useState } from "react";
import { GameEvent, Style } from "../../utils/constants";
import styles from "./styles.module.scss";
import snoopy_winner from "../../assets/snoopy_winner.gif";
import snoopy_loss from "../../assets/snoopy_loss.gif";
import bear_winner from "../../assets/bear_winner.gif";
import bear_loss from "../../assets/bear_loss.gif";
import snoopy_draw from "../../assets/snoopy_draw.gif";
import bear_draw from "../../assets/bear_draw.gif";
import { Link } from "react-router-dom";

export default function GameOver({ gameEvent, eventData }: { gameEvent: GameEvent, eventData: any }) {

    const [style, setStyle] = useState<Style | null>({ bgColor: "transparent" });
    const [mark, setMark] = useState("");
    const [gif, setGif] = useState<string>("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const player_mark = localStorage.getItem("mark");
        player_mark != null ?
            setMark(player_mark)
            : null;

        switch (gameEvent) {
            case GameEvent.Win:
                // are you the winner or the loser?
                if (mark === eventData.winner) {
                    setStyle(winStyles);
                    setMessage("You Win!");
                    if (mark === 'X') {
                        setGif(snoopy_winner);
                    } else setGif(bear_winner);
                } else {
                    setStyle(lossStyles);
                    setMessage("You Lose!");
                    if (mark === 'X') {
                        setGif(snoopy_loss);
                    } else setGif(bear_loss);
                }
                break;
            case GameEvent.Draw:
                setStyle(drawStyles);
                setMessage("Draw!!!");
                if (mark === 'X') {
                    setGif(snoopy_draw);
                } else setGif(bear_draw);
                break;
            case GameEvent.Error:
                break;
        }
    }, [])

    const winStyles = {
        bgColor: "lightgreen"
    }

    const lossStyles = {
        bgColor: "lightorange"
    }

    const drawStyles = {
        bgColor: "lightred"
    }


    return (
        <div style={{ backgroundColor: style!.bgColor }} className={`${styles.container} ${gameEvent == GameEvent.Win ?
                styles.win : gameEvent == GameEvent.Draw ? styles.draw : null}`}>
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
                    <Link to="/">
                        <button>
                            Back to home
                        </button>
                    </Link>
                    <div className={styles.gif}>
                        <img src={gif} alt="gif" />
                    </div>
                </div>

    )
}

