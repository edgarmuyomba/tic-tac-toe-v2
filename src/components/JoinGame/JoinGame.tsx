import { useContext, useRef } from "react";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Message from "../Message/Message";
import { AppContext } from "../App/App";

function JoinGame() {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Not in a context");
    }
    const { error } = context;

    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputRef.current !== null) {
            var value = inputRef.current.value;
            inputRef.current.value = "";
            navigate(`/game/${value}`, { replace: true });
        }
    }

    return (
        <div className={styles.container}>
            {
                error ? (
                    <Message />
                ) : null
            }
            <div className={styles.header}>
                <p className={styles.text}>
                    Please enter the game id
                </p>
                <p className={styles.subtext}>
                    A game ID is made up of 8 unique characters
                </p>
            </div>
            <form onSubmit={handleFormSubmit} action="">
                <input ref={inputRef} type="text" pattern="[^\s]{8}" name="game_id" id="game_id" placeholder="Game ID" />
            </form>
        </div>
    )
}

export default JoinGame;