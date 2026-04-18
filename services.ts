function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, options: RequestInit, retries: number = 3, delay: number = 1000): Promise<Response> {
    for (let i = 0; i <= retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response;
        } catch (error) {
            if (i < retries) {
                console.warn(`Attempt ${i + 1} failed: ${error.message}. Retrying in ${delay}ms...`);
                await sleep(delay);
            } else {
                throw new Error(`Failed after ${retries + 1} attempts: ${error.message}`);
            }
        }
    }
}

export { fetchWithRetry };