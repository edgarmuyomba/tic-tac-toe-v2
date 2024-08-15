import { createContext } from "react";

export const AppContext = createContext({
    websocket: new WebSocket("ws://127.0.0.1:8001/")
});