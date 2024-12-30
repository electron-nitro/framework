import type { ConsolaInstance } from "consola";
import type { Hookable } from "hookable";
import type { ElectronNitroOptions } from "./config";
import type { ElectronNitroHooks } from "./hooks";

export interface ElectronNitro {
  options: ElectronNitroOptions;
  hooks: Hookable<ElectronNitroHooks>;
  logger: ConsolaInstance;
  close: () => Promise<void>;
}

export interface ElectronNitroFrameworkInfo {
  name?: "electron-nitro" | (string & {});
  version?: string;
}
