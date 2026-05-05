function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry<T>(fn: () => Promise<T>, attempts: number, delay: number): Promise<T> {
    let lastError;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (i < attempts - 1) {
                await sleep(delay);
            }
        }
    }
    throw lastError;
}

// Example usage
async function fetchData(): Promise<string> {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
}

(async () => {
    try {
        const data = await retry(fetchData, 3, 1000);
        console.log('Data fetched successfully:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();