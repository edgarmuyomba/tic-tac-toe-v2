export function handleNewGame(eventData: any, setYourTurn: (turn: boolean) => void, setLoading: (loading: boolean) => void, setIsX: (IsX: boolean) => void) {
    setTimeout(() => {
        localStorage.setItem("mark", eventData.mark);
        if (eventData.mark === eventData.turn) {
            setYourTurn(true);
        } else setYourTurn(false);
        if (eventData.mark === 'X') setIsX(true);
        else setIsX(false);
        localStorage.setItem("game_id", eventData.game_id);
        setLoading(false);
    }, 1500);
}

export function handlePlayMove(eventData: any, setBoard: (array: (String | null)[]) => void, setYourTurn: (turn: boolean) => void) {
    setTimeout(() => {
        setBoard(eventData.game_state);
        var mark = localStorage.getItem("mark");
        var turn: String = eventData.turn;
        if (turn === mark) {
            setYourTurn(true);
        } else setYourTurn(false);
    }, 1500);
}