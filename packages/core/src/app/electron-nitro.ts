import { createHooks } from "hookable";
import { consola } from "consola";
import type { ListenOptions } from "listhen";
import type {
  ElectronNitro,
  ElectronNitroConfig,
  ElectronNitroOptions,
} from "../types";
import { loadOptions } from "../config/loader";

export async function createElectronNitroApp(
  config: ElectronNitroConfig = {},
  listenOptions: Partial<ListenOptions> = {}
) {
  const options: ElectronNitroOptions = await loadOptions(config);
  if (options.dev) {
    options.listenOptions = listenOptions;
  }

  const electronNitro: ElectronNitro = {
    options,
    hooks: createHooks(),
    logger: consola.withTag("electron-nitro"),
    close: () => electronNitro.hooks.callHook("close", electronNitro),
  };

  // Logger
  if (electronNitro.options.logLevel !== undefined) {
    electronNitro.logger.level = electronNitro.options.logLevel;
  }

  // Hooks
  electronNitro.hooks.addHooks(electronNitro.options.hooks);

  return electronNitro;
}
