const config = {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    timeout: parseInt(process.env.TIMEOUT) || 5000,
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS) || 3,
    logLevel: process.env.LOG_LEVEL || 'info',
};

export const getConfig = () => config;

export const setConfig = (updates) => {
    Object.keys(updates).forEach(key => {
        if (config.hasOwnProperty(key)) {
            config[key] = updates[key];
        }
    });
};

export const validateConfig = () => {
    if (!config.apiUrl) {
        throw new Error('API URL is required');
    }
    if (config.timeout <= 0) {
        throw new Error('Timeout must be a positive number');
    }
};