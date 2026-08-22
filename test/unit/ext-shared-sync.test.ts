import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const sharedSrc = path.join(repoRoot, "pi-triple-deps", "packages", "shared", "src");

async function read(rel: string): Promise<string> {
  return readFile(path.join(repoRoot, rel), "utf8");
}

describe("extensions/_shared 与 @away_from/shared 同步守卫", () => {
  it("presence.ts 与 shared/src/presence.ts 完全一致", async () => {
    const [a, b] = await Promise.all([
      read("pi-triple-ptl/extensions/_shared/presence.ts"),
      readFile(path.join(sharedSrc, "presence.ts"), "utf8"),
    ]);
    expect(a).toBe(b);
  });

  it("version-check.ts 与 shared/src/extension-version-check.ts 完全一致", async () => {
    const [a, b] = await Promise.all([
      read("pi-triple-ptl/extensions/_shared/version-check.ts"),
      readFile(path.join(sharedSrc, "extension-version-check.ts"), "utf8"),
    ]);
    expect(a).toBe(b);
  });
});
