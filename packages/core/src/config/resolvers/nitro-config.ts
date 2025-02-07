import { resolve } from "pathe";
import { ElectronNitroDefaults } from "../defaults";
import type { ElectronNitroOptions } from "../../types";

export function resolveNitroConfigOptions(options: ElectronNitroOptions) {
  const configs = options._config;

  options.nitro = {
    srcDir: resolve(
      options.srcDir,
      configs.source?.nitroDir || ElectronNitroDefaults.source!.nitroDir!
    ),
    outputDir: resolve(
      options.outputDir,
      configs.output?.nitroDir || ElectronNitroDefaults.output!.nitroDir!
    ),
  };
}
