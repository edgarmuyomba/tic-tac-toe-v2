export enum Status {
    Error,
    Info,
    Success
}

export interface Style {
    [property: string]: string,
}

export enum GameEvent {
    Win,
    Draw,
    Error,
    Join
}