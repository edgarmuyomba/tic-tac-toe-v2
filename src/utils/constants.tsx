export enum Status {
    Error,
    Info,
    Success
}

export interface Style {
    base: string,
    light: string
}

export enum GameEvent {
    Win,
    Draw,
    Error
}