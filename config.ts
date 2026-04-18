/**
 * Configuration settings for the application.
 * 
 * This file contains constants and settings that can be used throughout the application.
 */

// Default settings interface
interface DefaultSettings {
    environment: 'development' | 'production';
    apiUrl: string;
    port: number;
}

/**
 * The default configuration settings for the application.
 * 
 * These settings can be overridden by environment variables.
 */
const defaultConfig: DefaultSettings = {
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    port: parseInt(process.env.PORT || '3000', 10),
};

/**
 * Function to get the current configuration settings.
 * 
 * @returns {DefaultSettings} - The current application configuration settings.
 */
function getConfig(): DefaultSettings {
    return defaultConfig;
}

export { getConfig, DefaultSettings };