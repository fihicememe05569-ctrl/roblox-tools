export const safeJSONParse = (jsonString: string): any => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('JSON parsing error:', error);
        return null;
    }
};

export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    } finally {
        clearTimeout(id);
    }
};

export const validateUserData = (userData: { username: string; age: number }): boolean => {
    if (typeof userData.username !== 'string' || typeof userData.age !== 'number') {
        console.error('Invalid user data:', userData);
        return false;
    }
    return userData.age > 0;
};