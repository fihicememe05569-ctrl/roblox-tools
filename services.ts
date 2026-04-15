type ErrorCallback = (error: Error) => void;

class RobloxService {
    private static instance: RobloxService;
    private constructor() {}

    public static getInstance(): RobloxService {
        if (!RobloxService.instance) {
            RobloxService.instance = new RobloxService();
        }
        return RobloxService.instance;
    }

    public async fetchUserData(userId: string, onError: ErrorCallback): Promise<any> {
        try {
            const response = await this.simulateApiCall(userId);
            if (!response || !response.data) {
                throw new Error('No data received');
            }
            return response.data;
        } catch (error) {
            onError(error);
        }
    }

    private async simulateApiCall(userId: string): Promise<{ data?: any }> {
        // Simulate an API call with random errors
        if (Math.random() < 0.5) {
            return {}; // Simulates 'no data' received
        } else if (Math.random() < 0.5) {
            throw new Error('Network error'); // Simulates a network error
        }
        return { data: { userId, username: 'Player_' + userId } }; // Simulates a successful response
    }
}

const service = RobloxService.getInstance();
service.fetchUserData('12345', (error) => {
    console.error('Error fetching user data:', error.message);
});