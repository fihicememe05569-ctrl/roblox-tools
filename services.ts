// Function to simulate a network operation
async function networkOperation(): Promise<string> {
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.5;
        setTimeout(() => {
            success ? resolve('Network operation succeeded!') : reject(new Error('Network operation failed!'));
        }, 1000);
    });
}

// Retry Logic for Network Operations
async function retry<T>(fn: () => Promise<T>, attempts: number, delay: number): Promise<T> {
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === attempts - 1) throw error;
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error('Max retries reached');
}

// Example usage
async function performNetworkTask() {
    try {
        const result = await retry(networkOperation, 3, 2000);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

performNetworkTask();