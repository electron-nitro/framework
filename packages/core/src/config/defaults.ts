import type { ElectronNitroConfig } from "../types";

export const ElectronNitroDefaults: ElectronNitroConfig = {
    source: {
        nitroDir: "src/backend",
        electronDir: "src/electron",
    },    
    output: {
        nitroDir: "dist/backend",
        electronDir: "dist/electron",
    }
};