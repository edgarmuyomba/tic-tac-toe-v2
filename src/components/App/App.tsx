import { createContext, useState } from "react";
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
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function App() {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [mark, setMark] = useState("");
    const [ai_game, setAiGame] = useState(false);
    const [player_id, setPlayerId] = useState("");
    const [game_id, setGameId] = useState("");
    const [active, setActive] = useState(false);

    const websocket = new WebSocket("wss://rh69rj62-8001.eun1.devtunnels.ms/");

    return (
        <AppContext.Provider value={{ websocket, error, setError, errorMessage, setErrorMessage, mark, setMark, ai_game, setAiGame, player_id, setPlayerId, game_id, setGameId, active, setActive }}>
            <Outlet />
        </AppContext.Provider>
    )
}