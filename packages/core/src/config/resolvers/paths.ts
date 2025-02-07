import { resolve } from "pathe";
import { ElectronNitroDefaults } from "../defaults";
import type { ElectronNitroOptions } from "../../types";

export function resolvePathOptions(options: ElectronNitroOptions) {
  options.rootDir = resolve(options.rootDir || ".");

  const configs = options._config;

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
