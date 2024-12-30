import type { Nitro, NitroConfig } from "nitropack/types";
import type { ElectronNitro } from "./electron-nitro";

export type HookResult = void | Promise<void>;

export interface ElectronNitroHooks {
  // ElectronNitro
  /**
   * Called after ElectronNitro initialization, when the ElectronNitro instance is ready to work.
   * @param electronNitro The configured ElectronNitro object
   * @returns Promise
   */
  ready: (electronNitro: ElectronNitro) => HookResult;
  /**
   * Called when ElectronNitro instance is gracefully closing.
   * @param electronNitro The configured ElectronNitro object
   * @returns Promise
   */
  close: (electronNitro: ElectronNitro) => HookResult;

  /**
   * Called during ElectronNitro initialization, before installing user modules.
   * @returns Promise
   */
  "modules:before": () => HookResult;
  /**
   * Called during ElectronNitro initialization, after installing user modules.
   * @returns Promise
   */
  "modules:done": () => HookResult;

  // Nitropack
  /**
   * Called before initializing Nitro, allowing customization of Nitro's configuration.
   * @param nitroConfig The nitro config to be extended
   * @returns Promise
   */
  "nitro:config": (nitroConfig: NitroConfig) => HookResult;
  /**
   * Called after Nitro is initialized, which allows registering Nitro hooks and interacting directly with Nitro.
   * @param nitro The created nitro object
   * @returns Promise
   */
  "nitro:init": (nitro: Nitro) => HookResult;
  /**
   * Called before building the Nitro instance.
   * @param nitro The created nitro object
   * @returns Promise
   */
  "nitro:build:before": (nitro: Nitro) => HookResult;
}
