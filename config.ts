type Config = { apiUrl: string; timeout: number; retries: number; };

const defaultConfig: Config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
};

const validateConfig = (config: Partial<Config>): Config => {
    const validatedConfig: Config = { ...defaultConfig, ...config };

    if (typeof validatedConfig.apiUrl !== 'string') {
        throw new Error('Invalid apiUrl: must be a string');
    }
    if (typeof validatedConfig.timeout !== 'number' || validatedConfig.timeout <= 0) {
        throw new Error('Invalid timeout: must be a positive number');
    }
    if (typeof validatedConfig.retries !== 'number' || validatedConfig.retries < 0) {
        throw new Error('Invalid retries: must be a non-negative number');
    }

    return validatedConfig;
};

export { Config, defaultConfig, validateConfig };