type NetworkOperation<T> = () => Promise<T>;

type RetryOptions = {
    retries?: number;
    delay?: number;
};

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry<T>(operation: NetworkOperation<T>, options: RetryOptions = {}): Promise<T> {
    const { retries = 3, delay = 1000 } = options;
    let lastError;

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            if (attempt < retries - 1) {
                await sleep(delay);
            }
        }
    }
    throw lastError;
}

export { retry, NetworkOperation, RetryOptions };