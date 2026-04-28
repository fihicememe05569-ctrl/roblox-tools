export class ServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ServiceError';
    }
}

export class Service {
    private serviceData: any;

    constructor(data: any) {
        this.serviceData = data;
    }

    public async fetchData(url: string): Promise<any> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new ServiceError(`Network response was not ok: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            if (error instanceof ServiceError) {
                console.error('ServiceError:', error.message);
            } else if (error instanceof TypeError) {
                console.error('TypeError: Check your URL or network connection.', error);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error; // Re-throwing error for further handling
        }
    }

    public async processData(url: string): Promise<void> {
        try {
            const data = await this.fetchData(url);
            this.handleData(data);
        } catch (error) {
            console.error('Failed to process data:', error);
        }
    }

    private handleData(data: any): void {
        // Assume some processing here
        console.log('Data processed:', data);
    }
}