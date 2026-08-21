import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["test/**/*.test.ts", "test/**/*.test.tsx", "packages/*/test/**/*.test.ts"],
    testTimeout: 90_000,
    maxWorkers: 4,
    poolOptions: {
      maxWorkers: 4,
    },
    server: {
      deps: {
        // 强制内联 npm 包（shared/infra 是已发布 dist，不内联时 vi.mock 无法穿透
        // infra 的 SDK 边界——与 pi-triple-pth 仓同一约束）。
        inline: [/@away_from\/(infra|shared)/],
      },
    },
  },
});
