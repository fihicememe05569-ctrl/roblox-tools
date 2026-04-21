interface Config {
    apiUrl: string;
    retryAttempts: number;
    timeout: number;
}

const defaultConfig: Config = {
    apiUrl: 'https://api.example.com',
    retryAttempts: 3,
    timeout: 5000
};

function loadConfig(customConfig?: Partial<Config>): Config {
    return {...defaultConfig, ...customConfig};
}

const config = loadConfig();

export default config;
export { loadConfig, Config };