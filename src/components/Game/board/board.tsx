import styles from './styles.module.scss';

export default function Board({ board, IsX, yourTurn, setYourTurn, websocket }: { board: (String | null)[], IsX: boolean, yourTurn: boolean, setYourTurn: (turn: boolean) => void, websocket: WebSocket }) {

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (yourTurn) {
            const element = event.currentTarget;
            var mark = localStorage.getItem("mark");
            if (!(element.textContent === "X" || element.textContent == "O")) {
                element.textContent = mark;
                setYourTurn(false);
                const index = parseInt(element.dataset.index!);
                const newEvent = {
                    type: "play_move",
                    game_id: localStorage.getItem("game_id"),
                    index: index
                }
                websocket.send(JSON.stringify(newEvent));
            }
        } else {
            // handle error, not your turn
        }
    }

    return (
        <div className={styles.container}>
            {
                board.map((cell, index) => {
                    return (
                        <div key={index} data-index={index} className={styles.cell}
                            style={{ color: IsX ? "red" : "black" }} onClick={handleClick}
                        >{
                                cell !== null && cell
                            }</div>
                    )
                })
            }
        </div>
    )
}