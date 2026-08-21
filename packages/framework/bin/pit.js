#!/usr/bin/env node
/**
 * @away_from/framework bin wrapper（源码仓）——npm 安装期 stable bin 链接。
 *
 * dist/pit.js 构建后存在（postinstall 会 build），未构建时经 node_modules/tsx
 * 直跑 src/pit.ts；两者都不可用给出明确提示。
 */
import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distEntry = join(packageRoot, "dist", "pit.js");
const srcEntry = join(packageRoot, "src", "pit.ts");
const repoRoot = resolve(packageRoot, "..", "..");
const tsxCli = join(repoRoot, "node_modules", "tsx", "dist", "cli.mjs");

if (existsSync(distEntry)) {
  const child = spawn(process.execPath, [distEntry, ...process.argv.slice(2)], { stdio: "inherit" });
  child.on("exit", (code) => process.exit(code ?? 1));
} else if (existsSync(tsxCli)) {
  const child = spawn(process.execPath, [tsxCli, srcEntry, ...process.argv.slice(2)], { stdio: "inherit" });
  child.on("exit", (code) => process.exit(code ?? 1));
} else {
  console.error("ptl 未构建且缺少 tsx（开发依赖）——先执行 npm install && npm run build");
  process.exit(1);
}
