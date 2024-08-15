import { createContext, useState } from "react";
import { Outlet } from "react-router-dom"

interface AppContextType {
    websocket: WebSocket;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function App() {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const websocket = new WebSocket("ws://127.0.0.1:8001/");

    return (
        <AppContext.Provider value={{ websocket, error, setError, errorMessage, setErrorMessage }}>
            <Outlet />
        </AppContext.Provider>
    )
}