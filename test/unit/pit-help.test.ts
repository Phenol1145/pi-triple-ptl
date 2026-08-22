import { describe, it, expect, vi } from "vitest";
import { printHelp, printGettingStarted, printNamespaceHelp, printCommandHelp } from "../../packages/framework/src/cli/main.js";

function capture(fn: () => void): string {
  const lines: string[] = [];
  const spy = vi.spyOn(console, "log").mockImplementation((...a: unknown[]) => { lines.push(a.join(" ")); });
  try { fn(); } finally { spy.mockRestore(); }
  return lines.join("\n");
}

describe("printHelp（分组）", () => {
  it("含全部组标题（TUI 已移除）", () => {
    const out = capture(printHelp);
    for (const g of ["日常使用", "Operator Console（已迁移）", "模板与配置", "本地程序调试（容器运维已迁 pth）", "PTH 交互", "Agent", "系统与维护"]) {
      expect(out).toContain(g);
    }
    expect(out).not.toContain("可视化 TUI");
  });
  it("含 program/pth/迁移提示命令", () => {
    const out = capture(printHelp);
    expect(out).toContain("program dev");
    expect(out).toContain("pth submit");
    expect(out).toContain("pth web");
    expect(out).toContain("stack …（deprecated）");
    expect(out).toContain("local-exec（已迁移）");
    expect(out).not.toContain("tui dashboard");
  });
  it("无 tenant 残留（已改名 template）", () => {
    const out = capture(printHelp);
    expect(out).not.toContain("tenant");
    expect(out).toContain("template");
  });
});

describe("printGettingStarted", () => {
  it("含 onboard/start/pth web/help 四条指引（tui 已移除）", () => {
    const out = capture(printGettingStarted);
    expect(out).toContain("ptl onboard");
    expect(out).toContain("ptl start");
    expect(out).toContain("pth web");
    expect(out).toContain("ptl help");
    expect(out).not.toContain("tui");
  });
});

describe("printNamespaceHelp", () => {
  it("hub → 显示迁移提示（pth program）", () => {
    const out = capture(() => printNamespaceHelp("hub"));
    for (const c of ["已退役", "pth program submit/run/list"]) expect(out).toContain(c);
  });
  it("tui → 显示已废弃提示", () => {
    const out = capture(() => printNamespaceHelp("tui"));
    expect(out).toContain("已废弃");
    expect(out).not.toContain("dashboard");
  });
});

describe("printCommandHelp", () => {
  it("start → 含用法与示例", () => {
    const out = capture(() => printCommandHelp("start"));
    expect(out).toContain("start");
    expect(out).toContain("--template");
  });
  it("operator → 显示已迁移到 pth web", () => {
    const out = capture(() => printCommandHelp("operator"));
    expect(out).toContain("已迁移");
    expect(out).toContain("pth web");
    expect(out).not.toContain("--no-open");
  });
  it("未知命令 → 退化 printHelp（含分组标题）", () => {
    const out = capture(() => printCommandHelp("nonexistent-cmd"));
    expect(out).toContain("日常使用");
  });
});
