import { resolve } from "pathe";
import { ElectronNitroDefaults } from "../defaults";
import type { ElectronNitroOptions } from "../../types";

export function resolvePathOptions(options: ElectronNitroOptions) {
  const configs = options._config;

  options.rootDir = resolve(
    options.rootDir || configs.rootDir || ElectronNitroDefaults.rootDir!
  );

  options.srcDir = resolve(
    options.rootDir,
    options.srcDir ||
      configs.source?.rootDir ||
      ElectronNitroDefaults.source!.rootDir!
  );
  options.outputDir = resolve(
    options.rootDir,
    options.outputDir ||
      configs.output?.rootDir ||
      ElectronNitroDefaults.output!.rootDir!
  );
}
