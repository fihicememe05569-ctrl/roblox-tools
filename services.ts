export class RobloxService {
    private static apiUrl = 'https://api.roblox.com';

    public static async fetchData(endpoint: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return { error: error.message };
        }
    }

    public static async getPlayerData(playerId: string): Promise<any> {
        if (!playerId || typeof playerId !== 'string') {
            return { error: 'Invalid player ID' };
        }
        return this.fetchData(`players/${playerId}`);
    }

    public static async getGameData(gameId: string): Promise<any> { 
        if (!gameId || typeof gameId !== 'string') {
            return { error: 'Invalid game ID' };
        }
        return this.fetchData(`games/${gameId}`);
    }
}