import { useContext } from "react";
import { Style } from "../../utils/constants";
import styles from "./styles.module.scss";
import { AppContext } from "../App/App";

export default function Message() {

    const context = useContext(AppContext);

    if (!context) {
        throw new Error("Not in a context");
    }
    const { errorMessage } = context;

    const errorStyles: Style = {
        base: "rgb(180, 36, 36)",
        light: "rgb(255, 222, 216)"
    }

    return (
        <div className={styles.container} style={{ border: `1px solid ${errorStyles.base}`, backgroundColor: errorStyles.light, }}>
            <div className={styles.icon}>
                {
                    <svg style={{ fill: errorStyles.base }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alert-circle</title><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
                }
            </div>
            <div className={styles.message} style={{ color: errorStyles.base }}>
                {/* <p className={styles.title} style={{ color: errorStyles.base }}>
                    Error
                </p> */}
                {errorMessage}
            </div>
        </div>
    )
}