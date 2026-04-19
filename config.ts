import fs from 'fs';

interface Config {
    port: number;
    dbUrl: string;
    debug: boolean;
}

const defaultConfig: Config = {
    port: 3000,
    dbUrl: 'mongodb://localhost:27017/myapp',
    debug: false,
};

const loadConfig = (filePath: string): Config => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const userConfig = JSON.parse(data);
        return { ...defaultConfig, ...userConfig };
    } catch (error) {
        console.warn(`Failed to load config: ${error}`);
        return defaultConfig;
    }
};

export const config = loadConfig('./config.json');

export default config;
