export const MAX_RETRIES = 3;
export const RETRY_DELAY_MS = 1000;

export async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
    let attempts = 0;
    while (attempts < MAX_RETRIES) {
        try {
            return await fn();
        } catch (error) {
            attempts++;
            if (attempts >= MAX_RETRIES) {
                throw new Error(`Failed after ${MAX_RETRIES} attempts: ${error}`);
            }
            console.warn(`Attempt ${attempts} failed. Retrying in ${RETRY_DELAY_MS}ms...`);
            await delay(RETRY_DELAY_MS);
        }
    }
    throw new Error('This should never be reached.');
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
