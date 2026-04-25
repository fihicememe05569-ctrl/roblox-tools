type NetworkOperation = () => Promise<any>;

type RetryOptions = {
    retries?: number;
    delay?: number;
};

const defaultRetryOptions: RetryOptions = {
    retries: 3,
    delay: 1000,
};

async function retry<T>(operation: NetworkOperation, options?: RetryOptions): Promise<T> {
    const { retries, delay } = { ...defaultRetryOptions, ...options };
    let attempts = 0;

    while (attempts < retries!) {
        try {
            return await operation();
        } catch (error) {
            attempts++;
            if (attempts < retries!) {
                console.warn(`Attempt ${attempts} failed: ${error}. Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.error(`Operation failed after ${attempts} attempts:`, error);
                throw error;
            }
        }
    }
    throw new Error('Max retries reached');
}

export { retry };