import type { LogLevel } from "consola";
import type { NestedHooks } from "hookable";
import type { ListenOptions } from "listhen";
import type { PresetNameInput } from "nitropack/presets";
import type { ElectronNitroHooks } from "./hooks";

export interface ElectronNitroConfig {
  logLevel?: LogLevel;
  dev?: boolean;
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
  nitro?: {
    preset?: PresetNameInput;
  };
}

export interface ElectronNitroOptions {
  // Internal
  _config: ElectronNitroConfig;

  logLevel: LogLevel;

  rootDir: string;
  srcDir: string;
  outputDir: string;

  dev: boolean;
  listenOptions?: Partial<ListenOptions>;

  nitro: {
    srcDir: string;
    outputDir: string;
    preset?: PresetNameInput;
  };

  electron: {
    srcDir: string;
    outputDir: string;
  };

  hooks: NestedHooks<ElectronNitroHooks>;
}
