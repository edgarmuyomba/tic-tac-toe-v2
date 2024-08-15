import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom"

interface AppContextType {
    websocket: WebSocket;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    mark: string;
    setMark: React.Dispatch<React.SetStateAction<string>>;
    ai_game: boolean;
    setAiGame: React.Dispatch<React.SetStateAction<boolean>>;
    player_id: string;
    setPlayerId: React.Dispatch<React.SetStateAction<string>>;
    game_id: string;
    setGameId: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function App() {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [mark, setMark] = useState("");
    const [ai_game, setAiGame] = useState(false);
    const [player_id, setPlayerId] = useState("");
    const [game_id, setGameId] = useState("");

    const websocket = new WebSocket("ws://192.168.100.9:8001/");

    useEffect(() => {
        console.log(`Mark - ${mark}, PlayerID - ${player_id}`);
        
    }, [mark, player_id])

    return (
        <AppContext.Provider value={{ websocket, error, setError, errorMessage, setErrorMessage, mark, setMark, ai_game, setAiGame, player_id, setPlayerId, game_id, setGameId }}>
            <Outlet />
        </AppContext.Provider>
    )
}