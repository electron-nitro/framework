import { createHooks } from "hookable";
import { consola } from "consola";
import type {
  ElectronNitro,
  ElectronNitroConfig,
  ElectronNitroOptions,
} from "../types";

export function createElectronNitroApp(config: ElectronNitroConfig) {
  const options: ElectronNitroOptions = {
    _config: config,
  };

  const electronNitro: ElectronNitro = {
    options,
    hooks: createHooks(),
    logger: consola.withTag("electron-nitro"),
    close: () => electronNitro.hooks.callHook("close", electronNitro),
  };
}
