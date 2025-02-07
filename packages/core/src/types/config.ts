import type { LogLevel } from "consola";
import type { NestedHooks } from "hookable";
import type { ElectronNitroHooks } from "./hooks";

export interface ElectronNitroConfig {
  logLevel?: LogLevel;
  source?: {
    rootDir?: string;
    nitroDir?: string;
    electronDir?: string;
  };
  output?: {
    rootDir?: string;
    nitroDir?: string;
    electronDir?: string;
  };
  hooks?: NestedHooks<ElectronNitroHooks>;
}

export interface ElectronNitroOptions {
  // Internal
  _config: ElectronNitroConfig;

  logLevel: LogLevel;

  rootDir: string;
  srcDir: string;
  outputDir: string;

  nitro: {
    srcDir: string;
    outputDir: string;
  };

  electron: {
    srcDir: string;
    outputDir: string;
  };

  hooks: NestedHooks<ElectronNitroHooks>;
}
