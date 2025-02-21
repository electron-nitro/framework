import { ElectronNitroDefaults } from "../defaults";
import type { ElectronNitroOptions } from "../../types";

export function resolveCommonOptions(options: ElectronNitroOptions) {
  const configs = options._config;

  options.logLevel =
    options.logLevel || configs.logLevel || ElectronNitroDefaults.logLevel!;

  options.dev = options.dev || configs.dev || ElectronNitroDefaults.dev!;

  options.hooks =
    options.hooks || configs.hooks || ElectronNitroDefaults.hooks!;
}
