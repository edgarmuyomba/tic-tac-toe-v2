import { GameEvent } from "./constants";

export function handleNewGame(eventData: any, setYourTurn: (turn: boolean) => void, setLoading: (loading: boolean) => void, setIsX: (IsX: boolean) => void, setMark: (IsX: string) => void, setGameId: (IsX: string) => void, setPlayerId: (IsX: string) => void) {
    setTimeout(() => {
        setMark(eventData.mark);
        if (eventData.mark === eventData.turn) {
            setYourTurn(true);
        } else setYourTurn(false);
        if (eventData.mark === 'X') setIsX(true);
        else setIsX(false);
        setGameId(eventData.game_id);
        setPlayerId(eventData.player_id);
        setLoading(false);
    }, 1500);
}

export function handlePlayMove(eventData: any, setBoard: (array: (String | null)[]) => void, setYourTurn: (turn: boolean) => void, mark: string) {
    
    setTimeout(() => {
        setBoard(eventData.game_state);
        var turn: String = eventData.turn;
        
        if (turn === mark) {
            setYourTurn(true);
        } else setYourTurn(false);
    }, 200);
}

export function handleGameEvents(eventData: any, event: GameEvent, setBoard: (array: (String | null)[]) => void) {
    switch (event) {
        case GameEvent.Win:
            setTimeout(() => {
                setBoard(eventData.game_state);
            }, 500);
            break;
        case GameEvent.Draw:
            setTimeout(() => {
                setBoard(eventData.game_state);
            }, 500);
            break;
        case GameEvent.Join:
            setTimeout(() => {
                // displayMessage(showMessage);
            }, 500);
            break;
    }
}

export function displayMessage(showMessage: (message: boolean) => void) {
    showMessage(true);
    setTimeout(() => {
        showMessage(false);
    }, 5000);
}