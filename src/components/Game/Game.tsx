import { useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";

function Game() {

    const { type } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let mark = "";
    let turn = "";
    let game_id = "";

    useEffect(() => {
        if (type === 'new_game') {
            // generate a unique ID and send it to the server or notify the server of a new game and get a game ID
            let websocket = new WebSocket("ws://127.0.0.1:8001/");
            websocket.addEventListener("open", () => {
                websocket.send(JSON.stringify({ "type": "new_game" }));
                function listener(event: MessageEvent) {
                    const eventData = JSON.parse(event.data);
                    if (eventData.type == "new_game") {
                        mark = eventData.mark;
                        turn = eventData.turn;
                        game_id = eventData.game_id;
                    }
                }
                websocket.addEventListener("message", listener);
                websocket.removeEventListener("message", listener);
                setLoading(false);
            });
        } else {
            // notify the server that a second player has started the game of id=type
        }
    }, []);

    return (
        <div className={styles.container}>
            {
                loading
                    ? null
                    : (
                        <>
                            <Header mark={mark} turn={turn} />
                            <Board />
                            <Footer game_id={game_id} />
                        </>
                    )
            }
        </div>
    )
}

export default Game;