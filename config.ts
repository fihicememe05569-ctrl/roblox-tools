type Config = {  settingA: string;  settingB: number;  enableFeatureX: boolean;};

const defaultConfig: Config = {  settingA: 'defaultA',  settingB: 42,  enableFeatureX: true};

function loadConfig(userConfig?: Partial<Config>): Config {  return {    ...defaultConfig,    ...userConfig,  };}

export { Config, loadConfig };