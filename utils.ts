const RETRY_LIMIT = 3;
const RETRY_DELAY = 1000;

async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry<T>(operation: () => Promise<T>, retries: number = RETRY_LIMIT): Promise<T> {
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            if (attempt < retries - 1) {
                await delay(RETRY_DELAY);
            }
        }
    }
    throw new Error(`Operation failed after ${retries} attempts: ${lastError}`);
}

export { retry };