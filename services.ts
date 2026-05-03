import { HttpService, Players } from 'game/services';

export class PerformanceOptimizer {
    private playerStats: Record<string, number> = {};
    private static instance: PerformanceOptimizer | null = null;

    private constructor() {}

    public static getInstance(): PerformanceOptimizer {
        if (!this.instance) {
            this.instance = new PerformanceOptimizer();
        }
        return this.instance;
    }

    public trackPlayerPerformance(playerId: string): void {
        if (!this.playerStats[playerId]) {
            this.playerStats[playerId] = 0;
        }
        this.playerStats[playerId] += 1;
        this.sendPerformanceData(playerId);
    }

    private sendPerformanceData(playerId: string): void {
        const data = {
            playerId: playerId,
            performanceScore: this.playerStats[playerId],
        };
        HttpService.postAsync('https://api.roblox-performance.com/track', data);
    }

    public getPerformanceStats(playerId: string): number | null {
        return this.playerStats[playerId] || null;
    }
}

const perfOptimizer = PerformanceOptimizer.getInstance();
Players.PlayerAdded.Connect((player) => {
    perfOptimizer.trackPlayerPerformance(player.UserId.toString());
});