import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: ["src/index", "src/configurer/index", "src/types/index"],
});
