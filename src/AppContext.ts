import { createContext } from "react";

export const AppContext = createContext({
    websocket: new WebSocket("ws://192.168.100.9:8001/")
});