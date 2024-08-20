import { useNavigate, useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import { handleGameEvents, handleNewGame, handlePlayMove } from "../../utils/utils";
import Message from "../Message/Message";
import { GameEvent } from "../../utils/constants";
import GameOver from "../GameOver/GameOver";
import { useContext } from "react";
import { HashLoader } from "react-spinners";
import { AppContext } from "../App/App";

function Game() {

    const { type } = useParams();

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Not in a context");
    }

    const { websocket, error, setError, setErrorMessage, setAiGame, setMark, setGameId, setPlayerId, mark } = context;

    const [loading, setLoading] = useState(true);

    const [board, setBoard] = useState<(String | null)[]>([null, null, null, null, null, null, null, null, null]);
    const [IsX, setIsX] = useState(false);
    const [yourTurn, setYourTurn] = useState(false);

    const [gameEvent, setGameEvent] = useState<GameEvent>(GameEvent.Error);
    const [gameOver, setGameOver] = useState(false);
    const [eventData, setEventData] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {

        if (type === 'new_game') {

            websocket.sendMessage(JSON.stringify({ type: "new_game" }));

        } else if (type === 'ai') {

            setAiGame(true);

            websocket.sendMessage(JSON.stringify({ type: "ai" }));

        } else {

            websocket.sendMessage(JSON.stringify({ type: "join_game", game_id: type }));

        }
    }, [type]);

    const handleMessage = (event: MessageEvent) => {
        const _eventData = JSON.parse(event.data);

        setEventData(_eventData);
        switch (_eventData.type) {
            case "new_game":
                handleNewGame(_eventData, setYourTurn, setLoading, setIsX, setMark, setGameId, setPlayerId, setBoard);
                break;
            case "play_move":
                handlePlayMove(_eventData, setBoard, setYourTurn, mark);
                break;
            case "win":
                handleGameEvents(_eventData, GameEvent.Win, setBoard);
                setGameEvent(GameEvent.Win);
                setTimeout(() => {
                    setGameOver(true);
                }, 500);
                break;
            case "draw":
                handleGameEvents(_eventData, GameEvent.Draw, setBoard);
                setGameEvent(GameEvent.Draw);
                setTimeout(() => {
                    setGameOver(true);
                }, 500);
                break;
            case "error":
                setGameEvent(GameEvent.Error);
                setErrorMessage(_eventData.message);
                setError(true)
                setTimeout(() => {
                    setError(false);
                }, 5000)
                navigate('/join_game/', { replace: true })
                break;
            case "player_joined":
                setErrorMessage("A second player has joined the game");
                setError(true)
                setTimeout(() => {
                    setError(false);
                }, 3000)
                break;
            case "player_left":
                setErrorMessage("The other player has left the game!");
                setError(true);
                navigate('/', { replace: true });
                setTimeout(() => {
                    setError(false);
                }, 5000)
                break;
        }
    }

    websocket.onMessage(handleMessage);


    return (
        <div className={styles.container}>
            {
                <GameOver gameEvent={gameEvent} eventData={eventData} display={gameOver} />
                // <GameOver gameEvent={GameEvent.Win} eventData={{ winner: 'O' }} display={true} />
            }
            {
                error ? (
                    <Message />
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