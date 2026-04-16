async function fetchWithRetry(url: string, options: RequestInit, retries: number = 3): Promise<Response> {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response;
        } catch (error) {
            lastError = error;
            if (attempt < retries) {
                const backoffTime = Math.pow(2, attempt) * 100;
                await new Promise(resolve => setTimeout(resolve, backoffTime));
            }
        }
    }
    throw lastError;
}

export { fetchWithRetry };