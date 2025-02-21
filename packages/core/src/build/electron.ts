import ts from "typescript";
import type { ElectronNitro } from "../types";

export function compileElectronSources(electronNitro: ElectronNitro) {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext, // 编译目标为 ESNext
    module: ts.ModuleKind.CommonJS, // 使用 CommonJS 模块
    strict: false, // 非严格模式
    esModuleInterop: true, // 允许使用 ES 模块交互
    allowJs: true, // 允许使用 JS 文件
    resolveJsonModule: true, // 允许使用 JSON 模块
    skipLibCheck: true, // 跳过库检查
    forceConsistentCasingInFileNames: true, // 强制文件名大小写一致
    rootDir: electronNitro.options.electron.srcDir, // 根目录
    outDir: electronNitro.options.electron.outputDir, // 输出目录
  };

  const fileNames = ts.sys.readDirectory(compilerOptions.rootDir!, [".ts"]);

  // 创建编译程序
  const program = ts.createProgram(fileNames, compilerOptions);

  // 编译
  const emitResult = program.emit();

  // 如果有错误，打印错误信息
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      electronNitro.logger.log(
        `错误在文件 ${diagnostic.file.fileName} 的第 ${line + 1} 行，第 ${
          character + 1
        } 列: ${message}`
      );
    } else {
      electronNitro.logger.log(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")
      );
    }
  });

  return emitResult;
}
