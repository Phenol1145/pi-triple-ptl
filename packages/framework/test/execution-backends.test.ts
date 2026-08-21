import { describe, expect, it } from "vitest";
import { LocalBackend } from "../src/execution/local-backend.js";
import { DockerExecBackend } from "../src/execution/docker-exec-backend.js";
import { ExecutionClientError } from "@away_from/shared/execution";

describe("execution/v1 PTL backends（P2）", () => {
  it("LocalBackend：argv 数组不经 shell；结果结构与能力声明一致", async () => {
    const backend = new LocalBackend();
    expect(await backend.getCapabilities()).toMatchObject({ streaming: false, uidIsolation: false });
    const result = await backend.execute({ cmd: ["node", "-e", "console.log('hi'); console.error('warn')"] });
    expect(result).toMatchObject({ exitCode: 0, stdout: "hi\n", stderr: "warn\n", timedOut: false });
  });

  it("LocalBackend：超时杀进程组 + timedOut", async () => {
    const backend = new LocalBackend({ defaultTimeoutMs: 50 });
    const result = await backend.execute({ cmd: "sleep 10", timeoutMs: 80 });
    expect(result.timedOut).toBe(true);
    expect(result.signal).toBe("SIGKILL");
  });

  it("LocalBackend：输出上限截断", async () => {
    const backend = new LocalBackend({ maxStdoutBytes: 8 });
    const result = await backend.execute({ cmd: ["node", "-e", "process.stdout.write('x'.repeat(100))"] });
    expect(result.stdout).toHaveLength(8);
    expect(result.truncated).toMatchObject({ field: "stdout", originalLen: 8, keptLen: 8 });
  });

  it("LocalBackend：profile 不得提升；stream 按能力拒绝", async () => {
    const backend = new LocalBackend();
    await expect(backend.execute({ cmd: "true", profile: "sandbox-untrusted" })).rejects.toBeInstanceOf(ExecutionClientError);
    await expect(backend.execute({ cmd: "true", stream: true })).rejects.toMatchObject({ code: "BACKEND_UNAVAILABLE" });
  });

  it("DockerExecBackend：compose exec argv 与路径翻译正确", async () => {
    const calls: string[][] = [];
    const backend = new DockerExecBackend({
      composeFile: "deploy/docker-compose.yaml",
      projectName: "pth",
      service: "dev",
      pathMapping: { hostRoot: "/Users/me/repo", execRoot: "/works/repo" },
      run: async (_cmd, args) => {
        calls.push(args);
        return { code: 0, stdout: "ok", stderr: "" };
      },
    });
    const result = await backend.execute({
      cmd: "npm test",
      cwd: "/Users/me/repo/packages/framework",
      profile: "dev-container",
    });
    expect(result).toMatchObject({ exitCode: 0, stdout: "ok" });
    expect(calls[0]).toEqual([
      "compose", "-f", "deploy/docker-compose.yaml",
      "--project-name", "pth",
      "exec", "-T", "-w", "/works/repo/packages/framework",
      "dev", "bash", "-lc", "npm test",
    ]);
  });

  it("DockerExecBackend：profile/pathMapping 约束与输出截断", async () => {
    const backend = new DockerExecBackend({
      run: async () => ({ code: 0, stdout: "x".repeat(100), stderr: "" }),
      maxStdoutBytes: 16,
    });
    await expect(backend.execute({ cmd: "true", profile: "host" })).rejects.toBeInstanceOf(ExecutionClientError);
    await expect(
      backend.execute({ cmd: "true", cwd: "/elsewhere", pathMapping: { hostRoot: "/Users/me", execRoot: "/works" } }),
    ).rejects.toMatchObject({ code: "INVALID_REQUEST" });
    const result = await backend.execute({ cmd: "true", profile: "dev-container" });
    expect(result.stdout).toHaveLength(16);
    expect(result.truncated).toMatchObject({ field: "stdout", keptLen: 16 });
  });
});
