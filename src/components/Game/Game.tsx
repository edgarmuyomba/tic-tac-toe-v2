import { useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import { handleNewGame, handlePlayMove } from "../../utils/utils";

function Game() {

    const { type } = useParams();

    const [websocket, setWebsocket] = useState<WebSocket | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [board, setBoard] = useState<(String | null)[]>([null, null, null, null, null, null, null, null, null]);
    const [IsX, setIsX] = useState(false);
    const [yourTurn, setYourTurn] = useState(false);

    useEffect(() => {
        let _websocket = new WebSocket("ws://127.0.0.1:8001/");
        setWebsocket(_websocket);
        if (type === 'new_game') {
            // generate a unique ID and send it to the server or notify the server of a new game and get a game ID
            _websocket.addEventListener("open", () => {
                _websocket.send(JSON.stringify({ type: "new_game" }));
            });
        } else if (type === 'ai') {
            // play against the ai
            _websocket.addEventListener("open", () => {
                _websocket.send(JSON.stringify({ type: "ai" }));
            })
        } else {
            // notify the server that a second player has started the game of id=type

        }
        _websocket.addEventListener("message", (event: MessageEvent) => {
            const eventData = JSON.parse(event.data);
            switch (eventData.type) {
                case "new_game":
                    handleNewGame(eventData, setYourTurn, setLoading, setIsX);
                    break;
                case "play_move":
                    handlePlayMove(eventData, setBoard, setYourTurn);
                    break;
                case "win":
                    console.log("someone wins");
                    break;
                case "draw":
                    console.log("Draw");
                    break;
                case "error":
                    console.log("Error");
                    break;

            }
        });
    }, []);

    return (
        <div className={styles.container}>
            {
                loading
                    ? null
                    : (
                        <>
                            <Header IsX={IsX} yourTurn={yourTurn} />
                            <Board board={board} IsX={IsX} yourTurn={yourTurn} setYourTurn={setYourTurn} websocket={websocket!} />
                            <Footer />
                        </>
                    )
            }
        </div>
    )
}

export default Game;