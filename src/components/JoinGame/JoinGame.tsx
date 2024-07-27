import styles from "./styles.module.scss"

function JoinGame() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.text}>
                    Please enter the game id
                </p>
            </div>
            <form action="">
                <input type="text" pattern="[^\s]{6}" name="game_id" id="game_id" placeholder="Game ID" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default JoinGame;