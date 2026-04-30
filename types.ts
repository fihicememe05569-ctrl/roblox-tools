export interface PlayerStats {
    userId: string;
    score: number;
    level: number;
}

export interface GameSettings {
    maxPlayers: number;
    timeLimit: number;
    mapName: string;
}

export interface GameEvent {
    eventId: string;
    eventType: string;
    timestamp: Date;
}

export type GameStatus = 'pending' | 'inProgress' | 'finished' | 'paused';

export interface GameState {
    players: PlayerStats[];
    settings: GameSettings;
    status: GameStatus;
    lastEvent: GameEvent | null;
}

export const initialState: GameState = {
    players: [],
    settings: {
        maxPlayers: 10,
        timeLimit: 300,
        mapName: 'DefaultMap'
    },
    status: 'pending',
    lastEvent: null
};
