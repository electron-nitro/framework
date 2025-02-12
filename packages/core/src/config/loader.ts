import { loadConfig } from "c12";

import { resolvePathOptions } from "./resolvers/paths";
import { resolveNitroConfigOptions } from "./resolvers/nitro-config";
import { resolveElectronConfigOptions } from "./resolvers/electron-config";

import { ElectronNitroDefaults } from "./defaults";

import type { ElectronNitroConfig, ElectronNitroOptions } from "../types";

const configResolvers = [
  resolvePathOptions,
  resolveNitroConfigOptions,
  resolveElectronConfigOptions,
];

export async function loadOptions(configOverrides: ElectronNitroConfig = {}) {
  let presetOverride = configOverrides.nitro?.preset as string;
  if (configOverrides.dev) {
    presetOverride = "nitro-dev";
  }

  const loadedConfig = await loadConfig<ElectronNitroConfig>({
    name: "electron-nitro",
    extend: { extendKey: "extends" },
    defaults: ElectronNitroDefaults,
    overrides: {
      ...configOverrides,
      nitro: {
        preset: presetOverride,
      },
    },
  });

  const options = {
    _config: loadedConfig.config,
  } as ElectronNitroOptions;

  for (const resolver of configResolvers) {
    resolver(options);
  }

  return options;
}
