interface Config {  apiUrl: string;  timeout: number;  debug: boolean;}

const defaultConfig: Config = {  apiUrl: 'https://api.roblox.com',  timeout: 5000,  debug: false};

const loadConfig = (): Config => {  const config = JSON.parse(localStorage.getItem('robloxConfig') || 'null');  return { ...defaultConfig, ...config };};

const saveConfig = (newConfig: Partial<Config>) => {  const config = loadConfig();  localStorage.setItem('robloxConfig', JSON.stringify({ ...config, ...newConfig }));};

const clearConfig = () => {  localStorage.removeItem('robloxConfig');};

export { loadConfig, saveConfig, clearConfig, Config };