import { useEffect, useState } from "react";
import { Status, Style } from "../../utils/constants";
import styles from "./styles.module.scss";

export default function Message({ status, message }: { status: Status, message: string }) {

    const [style, setStyle] = useState<Style>({ base: "", light: "" });

    const errorStyles: Style = {
        base: "rgb(180, 36, 36)",
        light: "rgb(255, 222, 216)"
    }

    const infoStyles: Style = {
        base: "orange",
        light: "rgb(255, 238, 206)"
    }

    const successStyles: Style = {
        base: "green",
        light: "rgb(188, 250, 188)"
    }

    useEffect(() => {
        switch (status) {
            case Status.Error:
                setStyle(errorStyles);
                break;
            case Status.Info:
                setStyle(infoStyles);
                break;
            case Status.Success:
                setStyle(successStyles);
                break;
        }
    }, [status])

    return (
        <div className={styles.container} style={{ border: `1px solid ${style.base}`, backgroundColor: style.light, }}>
            <div className={styles.icon}>
                {
                    status === Status.Error
                        ? (
                            <svg style={{ fill: style.base }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alert-circle</title><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>

                        ) : status == Status.Info
                            ? (
                                <svg style={{ fill: style.base }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>information-slab-box</title><path d="M5 3H19C20.1 3 21 3.89 21 5V19C21 19.53 20.79 20.04 20.41 20.41C20.04 20.79 19.53 21 19 21H5C4.47 21 3.96 20.79 3.59 20.41C3.21 20.04 3 19.53 3 19V5C3 3.89 3.89 3 5 3M11 9H13V7H11V9M14 17V15H13V11H10V13H11V15H10V17H14Z" /></svg>
                            ) : status == Status.Success
                                ? (
                                    <svg style={{ fill: style.base }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>bookmark-check</title><path d="M17,3A2,2 0 0,1 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,14L17.25,7.76L15.84,6.34L11,11.18L8.41,8.59L7,10L11,14Z" /></svg>
                                ) : null
                }
            </div>
            <div className={styles.message} style={{ color: style.base }}>
                {/* <p className={styles.title} style={{ color: style.base }}>
                    Error
                </p> */}
                {message}
            </div>
        </div>
    )
}