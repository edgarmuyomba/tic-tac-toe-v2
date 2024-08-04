import { createContext } from "react";

export const AppContext = createContext({
    websocket: new WebSocket("ws://192.168.119.96:8001/")
});