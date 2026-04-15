export interface Config {
    apiUrl: string;
    timeout: number;
    enableCaching: boolean;
}

export const defaultConfig: Config = {
    apiUrl: 'https://api.roblox.com',
    timeout: 5000,
    enableCaching: true,
};

export function optimizeConfig(config: Config): Config {
    const optimizedConfig: Config = {
        ...defaultConfig,
        ...config,
    };

    if (optimizedConfig.enableCaching) {
        optimizedConfig.timeout = Math.max(1000, optimizedConfig.timeout);
    }

    return optimizedConfig;
}

export function getEffectiveApiUrl(config: Config): string {
    if (config.apiUrl.endsWith('/')) {
        return config.apiUrl.slice(0, -1);
    }
    return config.apiUrl;
}

export function logConfig(config: Config): void {
    console.log('Current Configuration:', JSON.stringify(config, null, 2));
}
