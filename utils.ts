export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt < retries - 1) {
                console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`, error);
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.error(`All ${retries} attempts failed.`);
                throw error;
            }
        }
    }
    throw new Error('Maximum retries reached.');
}