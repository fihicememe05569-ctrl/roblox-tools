export const safeParseJSON = (jsonString: string): any => {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error('Invalid JSON provided:', e);
        return null;
    }
};

export const assertNonNull = <T>(value: T | null | undefined, message: string): T => {
    if (value == null) {
        throw new Error(message);
    }
    return value;
};

export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout: number = 5000): Promise<Response> => {
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Fetch request timed out');
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
};

export const retryOperation = async <T>(operation: () => Promise<T>, retries: number = 3): Promise<T> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error) {
            if (i === retries - 1) {
                console.error('Operation failed after retries:', error);
                throw error;
            }
            console.warn('Operation failed, retrying...', error);
        }
    }
    throw new Error('Unreachable code');
};