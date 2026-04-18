interface Config {  setting1?: string;  setting2?: number;  setting3?: boolean;}

const defaultConfig: Config = {  setting1: 'defaultValue',  setting2: 42,  setting3: true};

function loadConfig(customConfig: Partial<Config>): Config {  return { ...defaultConfig, ...customConfig };}

// Usage example:
const userConfig: Partial<Config> = { setting1: 'customValue' };  
const finalConfig = loadConfig(userConfig);  
console.log(finalConfig); // { setting1: 'customValue', setting2: 42, setting3: true }