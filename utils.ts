export async function retryWithDelay<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const result = await fn();
            return result;
        } catch (error) {
            attempts++;
            if (attempts >= retries) {
                throw error;
            }
            console.log(`Attempt ${attempts} failed. Retrying...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Example usage:
async function fetchData() {
    // Simulate network operation
    if (Math.random() < 0.7) { // 70% chance of failure
        throw new Error('Network error!');
    }
    return 'Data fetched successfully!';
}

async function execute() {
    try {
        const data = await retryWithDelay(fetchData);
        console.log(data);
    } catch (e) {
        console.error('Failed to fetch data after retries:', e);
    }
}

execute();