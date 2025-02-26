import type { Nitro } from "nitropack/types";
import type { Listener } from "listhen";
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
   * Called after Nitro is initialized, which allows registering Nitro hooks and interacting directly with Nitro.
   * @param nitro The created nitro object
   * @returns Promise
   */
  "nitro:init": (nitro: Nitro) => HookResult;
  /**
   * Called after Nitro is initialized, and the dev server is started with listening.
   * @param nitro The created nitro object
   * @param listener The dev server listener
   * @returns Promise
   */
  "nitro:dev:listen": (nitro: Nitro, listener: Listener) => HookResult;
  /**
   * Called before building the Nitro instance.
   * @param nitro The created nitro object
   * @returns Promise
   */
  "nitro:build:before": (nitro: Nitro) => HookResult;
}
