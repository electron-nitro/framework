import {
  build,
  copyPublicAssets,
  createDevServer,
  createNitro,
  Nitro,
  prepare,
  prerender,
} from "nitropack/core";
import type { ElectronNitro } from "../types";

const hmrKeyRe = /^runtimeConfig\.|routeRules\./;

export async function watchNitroDev(electronNitro: ElectronNitro) {
  let nitro: Nitro;
  const reload = async () => {
    if (nitro) {
      electronNitro.logger.info("Restarting dev server...");
      if ("unwatch" in nitro.options._c12) {
        await nitro.options._c12.unwatch();
      }
      await nitro.close();
    }
    nitro = await createNitro(
      {
        rootDir: electronNitro.options.rootDir,
        srcDir: electronNitro.options.nitro.srcDir,
        output: {
          dir: electronNitro.options.nitro.outputDir,
        },
        dev: true,
        preset: "nitro-dev",
        _cli: { command: "dev" },
      },
      {
        watch: true,
        c12: {
          async onUpdate({ getDiff, newConfig }) {
            const diff = getDiff();

            if (diff.length === 0) {
              return; // No changes
            }

            electronNitro.logger.info(
              "Nitro config updated:\n" +
                diff.map((entry) => `  ${entry.toString()}`).join("\n")
            );

            await (diff.every((e) => hmrKeyRe.test(e.key))
              ? nitro.updateConfig(newConfig.config || {}) // Hot reload
              : reload()); // Full reload
          },
        },
      }
    );
    nitro.hooks.hookOnce("restart", reload);

    electronNitro.hooks.callHook("nitro:init", nitro);

    const server = createDevServer(nitro);
    const listhenOptions = electronNitro.options.listenOptions!;
    const listener = await server.listen(listhenOptions.port || 3000, listhenOptions);
    electronNitro.hooks.callHook("nitro:dev:listen", nitro, listener);

    await prepare(nitro);
    electronNitro.hooks.callHook("nitro:build:before", nitro);
    await build(nitro);
  };
  await reload();
}

export async function buildNitroProd(electronNitro: ElectronNitro) {
  const nitro = await createNitro({
    rootDir: electronNitro.options.rootDir,
    srcDir: electronNitro.options.nitro.srcDir,
    output: {
      dir: electronNitro.options.nitro.outputDir,
    },
    dev: false,
    minify: false,
    preset: electronNitro.options.nitro.preset,
  });

  electronNitro.hooks.callHook("nitro:init", nitro);

  await prepare(nitro);
  await copyPublicAssets(nitro);
  await prerender(nitro);

  electronNitro.hooks.callHook("nitro:build:before", nitro);
  await build(nitro);

  await nitro.close();
}
