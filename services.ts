type NetworkOperation = () => Promise<any>;

async function retry<T>(operation: NetworkOperation, retries: number, delay: number): Promise<T> {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            if (attempt >= retries) throw error;
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('Max retries reached');
}

// Sample usage:
async function fetchData(): Promise<any> {
    // Simulating a network operation that may fail
    const success = Math.random() > 0.5;
    if (!success) throw new Error('Network Error');
    return { data: 'some data' };
}

retry(fetchData, 5, 1000)
    .then(data => console.log('Fetched data:', data))
    .catch(err => console.error('Failed to fetch data:', err));
