function handleNewGame(eventData: any, setMark: (mark: string) => void, setTurn: (turn: string) => void, setGameId: (gameId: string) => void, setLoading: (loading: boolean) => void) {
    setMark(eventData.mark);
    setTurn(eventData.turn);
    setGameId(eventData.game_id);
    setLoading(false);
}

export { handleNewGame };