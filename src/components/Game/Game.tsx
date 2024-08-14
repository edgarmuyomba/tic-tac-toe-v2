import { Navigate, useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import { handleGameEvents, handleNewGame, handlePlayMove } from "../../utils/utils";
import Message from "../Message/Message";
import { GameEvent, Status } from "../../utils/constants";
import GameOver from "../GameOver/GameOver";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { HashLoader } from "react-spinners";

function Game() {

    const { type } = useParams();

    const { websocket } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [board, setBoard] = useState<(String | null)[]>([null, null, null, null, null, null, null, null, null]);
    const [IsX, setIsX] = useState(false);
    const [yourTurn, setYourTurn] = useState(false);

    const [message, showMessage] = useState(false);

    const [gameEvent, setGameEvent] = useState<GameEvent>(GameEvent.Error);
    const [gameOver, setGameOver] = useState(false);
    const [eventData, setEventData] = useState<any>();

    useEffect(() => {
        // let _websocket = new WebSocket("ws://127.0.0.1:8001/");
        // let _websocket = new WebSocket("wss://https://rh69rj62-8001.eun1.devtunnels.ms/");
        // setWebsocket(_websocket);
        if (type === 'new_game') {
            // websocket.addEventListener("open", () => {
            websocket.send(JSON.stringify({ type: "new_game" }));
            // });
        } else if (type === 'ai') {
            // play against the ai
            localStorage.setItem("ai_game", "true");
            // websocket.addEventListener("open", () => {
            websocket.send(JSON.stringify({ type: "ai" }));
            // })
        } else {
            // notify the server that a second player has started the game of id=type
            // websocket.addEventListener("open", () => {
            websocket.send(JSON.stringify({ type: "join_game", game_id: type }));
            // })
        }
        websocket.addEventListener("message", (event: MessageEvent) => {
            const _eventData = JSON.parse(event.data);
            setEventData(_eventData);
            switch (_eventData.type) {
                case "new_game":
                    handleNewGame(_eventData, setYourTurn, setLoading, setIsX);
                    break;
                case "play_move":
                    handlePlayMove(_eventData, setBoard, setYourTurn);
                    break;
                case "win":
                    handleGameEvents(_eventData, GameEvent.Win, setBoard, showMessage);
                    setGameEvent(GameEvent.Win);
                    setTimeout(() => {
                        setGameOver(true);
                    }, 500);
                    break;
                case "draw":
                    handleGameEvents(_eventData, GameEvent.Draw, setBoard, showMessage);
                    setGameEvent(GameEvent.Draw);
                    setTimeout(() => {
                        setGameOver(true);
                    }, 500);
                    break;
                case "error":
                    handleGameEvents(_eventData, GameEvent.Error, setBoard, showMessage);
                    setGameEvent(GameEvent.Error);
                    break;

            }


        });
    }, []);

    return (
        <div className={styles.container}>
            {
                <GameOver gameEvent={gameEvent} eventData={eventData} display={gameOver} />
                // <GameOver gameEvent={GameEvent.Win} eventData={{ winner: 'O' }} display={true} />
            }
            {
                message ? (
                    <Message status={Status.Info} message={"message"} />
                ) : null
            }
            {
                loading
                    ? (
                        <div className={styles.loadingContainer}>
                            <HashLoader color="green" />
                        </div>
                    )
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