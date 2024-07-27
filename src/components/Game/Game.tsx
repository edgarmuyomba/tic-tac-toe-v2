import { useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

function Game() {

    const { type } = useParams();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (type === 'new_game') {
            // generate a unique ID and send it to the server or notify the server of a new game and get a game ID
        } else if (type === 'ai') {
            // initialize the ai algorithm
        } else {
            // notify the server that a second player has started the game of id=type
        }
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <Board />
        </div>
    )
}

export default Game;