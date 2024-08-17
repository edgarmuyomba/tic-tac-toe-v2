import { useContext } from "react";
import styles from "./styles.module.scss";
import { AppContext } from "../../App/App";

export default function Footer() {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Not in context!");
    }

    const { game_id } = context;

    function copyText() {
        navigator.clipboard.writeText(game_id);
    } 

    return (
        <div className={styles.game_id} onClick={copyText}>
            <p className={styles.text}>
                {game_id}
            </p>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M13 7H7V5H13V7Z" fill="currentColor" />
                <path d="M13 11H7V9H13V11Z" fill="currentColor" />
                <path d="M7 15H13V13H7V15Z" fill="currentColor" />
                <path
                    // fill-rule="evenodd"
                    // clip-rule="evenodd"
                    d="M3 19V1H17V5H21V23H7V19H3ZM15 17V3H5V17H15ZM17 7V19H9V21H19V7H17Z"
                    fill="currentColor"
                />
            </svg>
            <p className={styles.sub}>
                GameID
            </p>
        </div>
    );
}