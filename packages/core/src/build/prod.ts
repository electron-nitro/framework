import type { ElectronNitro } from "../types";
import { compileElectronSources } from "./electron";
import { buildNitroProd } from "./nitro";

export async function buildProduction(electronNitro: ElectronNitro) {
  const emitResult = compileElectronSources(electronNitro);

  if (emitResult.emitSkipped) {
    electronNitro.logger.error("Electron应用代码 编译失败");
    process.exit(1); // 退出进程
  }

  await buildNitroProd(electronNitro);
}
