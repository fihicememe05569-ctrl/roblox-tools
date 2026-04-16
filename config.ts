interface AppConfig {
    apiUrl: string;
    port: number;
    debugMode: boolean;
}

const defaultConfig: AppConfig = {
    apiUrl: 'https://api.example.com',
    port: 3000,
    debugMode: false,
};

function loadConfig(customConfig: Partial<AppConfig>): AppConfig {
    return { ...defaultConfig, ...customConfig };
}

export { loadConfig, AppConfig };