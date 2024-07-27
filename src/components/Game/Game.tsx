import Board from "./board/board";
import Header from "./header/header";
import styles from "./styles.module.scss";

function Game() {

    return (
        <div className={styles.container}>
            <Header />
            <Board />
        </div>
    )
}

export default Game;