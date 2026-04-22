export interface Config {
    apiUrl: string;
    timeout: number;
    retryAttempts: number;
}

const defaultConfig: Config = {
    apiUrl: 'https://api.roblox.com',
    timeout: 5000,
    retryAttempts: 3,
};

const environmentConfig: Partial<Config> = {
    apiUrl: process.env.API_URL,
    timeout: Number(process.env.TIMEOUT),
};

export function getConfig(): Config {
    return {
        ...defaultConfig,
        ...environmentConfig,
        retryAttempts: environmentConfig.retryAttempts || defaultConfig.retryAttempts,
    };
}

export function printConfig(config: Config): void {
    console.log('Current Config:', JSON.stringify(config, null, 2));
}

export const config = getConfig();
printConfig(config);