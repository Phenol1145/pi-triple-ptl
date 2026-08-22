import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

async function readRepoScript(rel: string): Promise<string> {
  return readFile(path.join(repoRoot, rel), "utf8");
}

describe("pth/ptl 跨仓脚本同步守卫", () => {
  it("check-doc-links.ts 与 pth 完全一致", async () => {
    const [ptl, pth] = await Promise.all([
      readRepoScript("pi-triple-ptl/scripts/check-doc-links.ts"),
      readRepoScript("pi-triple-pth/scripts/check-doc-links.ts"),
    ]);
    expect(ptl).toBe(pth);
  });

  it("check-product-boundaries.ts 与 pth 完全一致", async () => {
    const [ptl, pth] = await Promise.all([
      readRepoScript("pi-triple-ptl/scripts/check-product-boundaries.ts"),
      readRepoScript("pi-triple-pth/scripts/check-product-boundaries.ts"),
    ]);
    expect(ptl).toBe(pth);
  });
});
