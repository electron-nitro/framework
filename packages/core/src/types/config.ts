export interface ElectronNitroConfig {
  source: {
    nitroDir: string;
    electronDir: string;
  };
  output: {
    nitroDir: string;
    electronDir: string;
  };
}

export interface ElectronNitroOptions {
  // Internal
  _config: ElectronNitroConfig;
}
