import { useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import { handleGameEvents, handleNewGame, handlePlayMove } from "../../utils/utils";
import Message from "../Message/Message";
import { GameEvent, Status } from "../../utils/constants";

function Game() {

    const { type } = useParams();

    const [websocket, setWebsocket] = useState<WebSocket | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [board, setBoard] = useState<(String | null)[]>([null, null, null, null, null, null, null, null, null]);
    const [IsX, setIsX] = useState(false);
    const [yourTurn, setYourTurn] = useState(false);

    const [message, showMessage] = useState(false);

    useEffect(() => {
        let _websocket = new WebSocket("ws://127.0.0.1:8001/");
        setWebsocket(_websocket);
        if (type === 'new_game') {
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
                    handleGameEvents(eventData, GameEvent.Win, setBoard, showMessage);
                    break;
                case "draw":
                    handleGameEvents(eventData, GameEvent.Draw, setBoard, showMessage);
                    break;
                case "error":
                    handleGameEvents(eventData, GameEvent.Error, setBoard, showMessage);
                    break;

            }
        });
    }, []);

    return (
        <div className={styles.container}>
            {
                message ? (
                    <Message status={Status.Info} message={"message"} />
                ) : null
            }
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