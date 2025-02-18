import { ElectronNitro } from "../types";
import { watchDev } from "./dev";
import { buildProduction } from "./prod";

export function build(electronNitro: ElectronNitro) {
  return electronNitro.options.dev
    ? watchDev(electronNitro)
    : buildProduction(electronNitro);
}
