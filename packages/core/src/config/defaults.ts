import { isTest } from "std-env";
import type { ElectronNitroConfig } from "../types";

export const ElectronNitroDefaults: ElectronNitroConfig = {
  logLevel: isTest ? 1 : 3,
  dev: false,
  rootDir: ".",
  source: {
    rootDir: "src",
    nitroDir: "backend",
    electronDir: "electron",
  },
  output: {
    rootDir: "dist",
    nitroDir: "backend",
    electronDir: "electron",
  },
  hooks: {},
};
