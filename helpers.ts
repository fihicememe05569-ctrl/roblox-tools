export async function retry<T>(operation: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }
            console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            delay *= 2; // Exponential backoff
        }
    }
    throw new Error('Should never reach here');
} 

// Example use case:
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function getDataWithRetry() {
    return retry(fetchData);
}
