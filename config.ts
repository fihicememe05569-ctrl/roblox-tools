/**
 * Configuration settings for the Roblox tools.
 * This file contains all necessary configurations required to set up the tools properly.
 */

interface Config {
    /** The API endpoint for fetching user data */
    apiEndpoint: string;
    /** The timeout duration for API requests in milliseconds */
    apiTimeout: number;
    /** A flag indicating if debug mode is enabled */
    debugMode: boolean;
}

const defaultConfig: Config = {
    apiEndpoint: 'https://api.roblox.com',
    apiTimeout: 5000,
    debugMode: false
};

/**
 * Retrieves the configuration settings.
 * @returns {Config} The current configuration settings.
 */
function getConfig(): Config {
    return defaultConfig;
}

/**
 * Updates the API endpoint in the configuration.
 * @param newEndpoint The new API endpoint to set.
 */
function updateApiEndpoint(newEndpoint: string): void {
    defaultConfig.apiEndpoint = newEndpoint;
}

/**
 * Enables or disables debug mode.
 * @param isEnabled A boolean indicating if debug mode should be enabled.
 */
function setDebugMode(isEnabled: boolean): void {
    defaultConfig.debugMode = isEnabled;
}

export { getConfig, updateApiEndpoint, setDebugMode, Config };