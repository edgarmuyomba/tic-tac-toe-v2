function handleNewGame(eventData: any, setMark: (mark: string) => void, setTurn: (turn: string) => void, setGameId: (gameId: string) => void, setLoading: (loading: boolean) => void) {
    setTimeout(() => {
        setMark(eventData.mark);
        setTurn(eventData.turn);
        setGameId(eventData.game_id);
        setLoading(false);
    }, 1500);
}

export { handleNewGame };