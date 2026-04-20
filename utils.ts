type NetworkOperation = () => Promise<any>;

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // in milliseconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function retryNetworkOperation(operation: NetworkOperation): Promise<any> {
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
        try {
            const result = await operation();
            return result;
        } catch (error) {
            attempt++;
            if (attempt === MAX_RETRIES) {
                throw new Error(`Operation failed after ${MAX_RETRIES} attempts: ${error}`);
            }
            console.log(`Attempt ${attempt} failed. Retrying in ${RETRY_DELAY}ms...`);
            await sleep(RETRY_DELAY);
        }
    }
}