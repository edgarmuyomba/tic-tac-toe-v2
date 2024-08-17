import { GameEvent } from "./constants";

export function handleNewGame(eventData: any, setYourTurn: (turn: boolean) => void, setLoading: (loading: boolean) => void, setIsX: (IsX: boolean) => void, setMark: (IsX: string) => void, setGameId: (IsX: string) => void, setPlayerId: (IsX: string) => void, setBoard: (board: string[]) => void) {
    console.log(eventData.mark);
    setMark(eventData.mark);
    if (eventData.mark === eventData.turn) {
        setYourTurn(true);
    } else setYourTurn(false);
    if (eventData.mark === 'X') setIsX(true);
    else setIsX(false);
    setGameId(eventData.game_id);
    setPlayerId(eventData.player_id);
    if (eventData.game_state) {
        setBoard(eventData.game_state);
    }
    setTimeout(() => {
        setLoading(false);
    }, 1500);
}

export function handlePlayMove(eventData: any, setBoard: (array: (String | null)[]) => void, setYourTurn: (turn: boolean) => void, mark: string) {

    setTimeout(() => {
        setBoard(eventData.game_state);
        var turn: String = eventData.turn;

        console.log(`Turn ${turn} Mark ${mark}`);

        setYourTurn(true);
    }, 200);
}

export function handleGameEvents(eventData: any, event: GameEvent, setBoard: (array: (String | null)[]) => void) {
    switch (event) {
        case GameEvent.Win:

            setBoard(eventData.game_state);

            break;
        case GameEvent.Draw:

            setBoard(eventData.game_state);

            break;
        case GameEvent.Join:
            setTimeout(() => {

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