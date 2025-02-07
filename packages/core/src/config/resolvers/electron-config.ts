import { resolve } from "pathe";
import { ElectronNitroDefaults } from "../defaults";
import type { ElectronNitroOptions } from "../../types";

export function resolveElectronConfigOptions(options: ElectronNitroOptions) {
  const configs = options._config;

  options.electron = {
    srcDir: resolve(
      options.srcDir,
      configs.source?.electronDir || ElectronNitroDefaults.source!.electronDir!
    ),
    outputDir: resolve(
      options.outputDir,
      configs.output?.electronDir || ElectronNitroDefaults.output!.electronDir!
    ),
  };
}
