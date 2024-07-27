import { useParams } from "react-router-dom";
import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";

function Game() {

    const { type } = useParams();

    return (
        <div className={styles.container}>
            <Header />
            <Board />
        </div>
    )
}

export default Game;