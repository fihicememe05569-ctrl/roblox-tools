export type User = {
    id: string;
    username: string;
    lastLogin: Date;
};

export type Game = {
    id: string;
    title: string;
    genre: string;
    createdAt: Date;
};

export type LeaderboardEntry = {
    userId: string;
    score: number;
};

export type GameConfig = {
    maxPlayers: number;
    private: boolean;
};

export interface GameSession {
    gameId: string;
    playerIds: string[];
    startTime: Date;
    endTime?: Date;
};

export type UserAchievements = {
    userId: string;
    achievements: string[];
};