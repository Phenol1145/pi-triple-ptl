/**
 * ptl/main — banner / 分组帮助 / 上手指引 / 单命令详情 渲染
 */

import { getPtlVersion } from "../version.js";

export function printBanner(): void {
  console.log("");
  console.log("  \x1b[36m\x1b[1mPi-Triple\x1b[0m \x1b[2mv" + getVersion() + "\x1b[0m");
  console.log("");
}

export function getVersion(): string { return getPtlVersion(); }

// ─── 分组帮助 ───────────────────────────────────────────────

interface HelpGroup { title: string; intro?: string; commands: Array<[string, string]>; }

const HELP_GROUPS: HelpGroup[] = [
  {
    title: "日常使用", intro: "会话生命周期",
    commands: [
      ["start [--template x] [--bg --name n]", "启动会话（日常主操作）"],
      ["pi", "原生前台启动（无 tmux）"],
      ["attach|switch|detach|stop <name>", "会话管理"],
      ["ls", "列出会话"],
    ],
  },
  {
    title: "Operator Console（已迁移）", intro: "operator console 已迁 PTH 侧",
    commands: [
      ["（shell）pth web [--port p]", "PTH Operator Console"],
    ],
  },
  {
    title: "模板与配置",
    commands: [
      ["template ls|new|rm|rename", "模板管理"],
      ["config get|set|unset|init", "配置管理"],
    ],
  },
  {
    title: "会话与追踪", intro: "纸带（session）与状态追踪（trace）",
    commands: [
      ["session ls|show|fork|clone|transfer|branch|tree|resume|attach|stop", "纸带操作（会话）"],
      ["restore [name…]", "按注册表恢复会话（重启后重建 + resume 原纸带）"],
      ["trace ls|show|timeline <agent>", "状态追踪（credit 变化）"],
    ],
  },
  {
    title: "本地程序调试（容器运维已迁 pth）",
    commands: [
      ["program dev <dir>", "本地调试 agent 程序（pi 原生会话）"],
      ["stack …（deprecated）", "容器生命周期统一走 pth up/tools/services"],
      ["local-exec（已迁移）", "使用 pth local-exec + pth services 管理"],
    ],
  },
  {
    title: "PTH 交互", intro: "已迁移到 pth CLI",
    commands: [
      ["（shell）pth submit | program | request | observe | …", "PTH 任务/程序/回退请求/观测"],
    ],
  },
  {
    title: "Agent",
    commands: [
      ["agent run|clean", "agent 实例"],
    ],
  },
  {
    title: "系统与维护",
    commands: [
      ["onboard", "首次导引向导"],
      ["status | doctor", "健康检查"],
      ["update", "更新本体"],
      ["install | remove", "安装/卸载扩展"],
      ["migrate", "迁移扩展到当前模板"],
      ["shared status|init", "共享层"],
      ["help [cmd] | version", "帮助 / 版本"],
    ],
  },
];

export function printHelp(): void {
  printBanner();
  console.log("  用法: ptl <command> [options]");
  console.log("");
  for (const g of HELP_GROUPS) {
    const intro = g.intro ? `  \x1b[2m— ${g.intro}\x1b[0m` : "";
    console.log(`  \x1b[1m${g.title}\x1b[0m${intro}`);
    for (const [cmd, desc] of g.commands) {
      console.log(`    ${cmd.padEnd(42)} \x1b[2m${desc}\x1b[0m`);
    }
    console.log("");
  }
  console.log("  \x1b[2m选项: --template <alias|uuid>  --project <name>  --model <model>\x1b[0m");
  console.log("  \x1b[2m详情: ptl help <cmd>   示例: ptl help start\x1b[0m");
  console.log("");
}

// ─── 上手指引（裸 ptl）──────────────────────────────────────

export function printGettingStarted(): void {
  printBanner();
  console.log("  首次使用？   \x1b[36mptl onboard\x1b[0m");
  console.log("  日常开发？   \x1b[36mptl start\x1b[0m");
  console.log("  运维前端？   \x1b[36mpth web\x1b[0m（operator console 已迁 PTH）");
  console.log("  查看全部？   \x1b[36mptl help\x1b[0m");
  console.log("");
}

// ─── 命名空间帮助 ───────────────────────────────────────────

const NAMESPACE_HELP: Record<string, Array<[string, string]>> = {
  tui: [
    ["tui（已废弃）", "TUI 产品形态已废弃——operator console（pth web）/ JupyterLab 承担前端"],
  ],
  hub: [
    ["hub", "已退役——PTH 交互请使用 `npm run pth -- <cmd>`"],
    ["pth program submit/run/list", "agent 程序提交/运行/列表"],
    ["pth request(s)/respond/observe/debug", "回退请求/观测/调试"],
    ["pth bench/job/console/lineage/trigger/kernel", "PTH 运维与监督"],
    ["ptl program dev <dir>", "本地程序调试（不再经 hub）"],
    ["pth up/tools/services", "容器运维（不再经 hub；ptl stack 已 deprecated）"],
  ],
  program: [
    ["program dev <dir> [pi args…]", "本地调试 agent 程序（pi 原生会话）"],
  ],
  stack: [
    ["stack …（deprecated）", "容器生命周期统一由 pth up/status/logs/down + pth tools/services 管理"],
  ],
  template: [
    ["template ls", "列出模板（别名 + UUID）"],
    ["template new [alias]", "新建模板"],
    ["template rm <alias>", "删除模板"],
    ["template rename <old> <new>", "重命名别名"],
  ],
  config: [
    ["config", "显示当前配置"],
    ["config get <key>", "读取配置项"],
    ["config set <key> <value>", "修改配置项"],
    ["config unset <key>", "删除可选配置项"],
    ["config init", "初始化 pi-triple.json"],
  ],
  agent: [
    ["agent run <template> <task>", "从模板实例化 agent 执行"],
    ["agent clean <agentId>", "清理临时工作区 (--all)"],
  ],
  shared: [
    ["shared status", "查看共享层状态"],
    ["shared init", "初始化共享层"],
  ],
  session: [
    ["session ls [--template x] [--workloop pi]", "列出纸带会话"],
    ["session show <id>", "会话详情"],
    ["session fork|clone <id> [--template x]", "分叉/克隆会话"],
    ["session transfer <id> --template x", "转移会话到其他模板"],
    ["session branch <id> --at <nodeId> [--template x]", "在节点处分支（--list-nodes 列出节点）"],
    ["session tree [--template x]", "会话谱系森林"],
    ["session resume <id> [--name n]", "后台恢复纸带会话"],
    ["session attach <name> | stop <id|name>", "接入/停止会话"],
  ],
  trace: [
    ["trace ls [--template x] [--agent a]", "列出状态追踪"],
    ["trace show <id>", "追踪详情"],
    ["trace timeline <agentId>", "agent 完整轨迹"],
  ],
};

export function printNamespaceHelp(ns: string): void {
  const rows = NAMESPACE_HELP[ns];
  if (!rows) { printHelp(); return; }
  console.log("");
  console.log(`  \x1b[36m\x1b[1mptl ${ns}\x1b[0m`);
  console.log("");
  for (const [cmd, desc] of rows) {
    console.log(`    ${cmd.padEnd(38)} \x1b[2m${desc}\x1b[0m`);
  }
  console.log("");
}

// ─── 单命令详情 ─────────────────────────────────────────────

const COMMAND_HELP: Record<string, { usage: string; desc: string; flags?: Array<[string, string]>; examples?: string[] }> = {
  start: {
    usage: "ptl start [--template x] [--bg --name n] [--model m]",
    desc: "启动 tmux 会话并接入（日常主操作）",
    flags: [["--template <alias|uuid>", "指定模板"], ["--bg", "纯后台不接入"], ["--name <n>", "命名会话"], ["--model <m>", "覆盖模型"]],
    examples: ["ptl start", "ptl start --template dev", "ptl start --bg --name coding"],
  },
  tui: { usage: "ptl tui（已废弃）", desc: "TUI 产品形态已废弃——前端由 pth web（operator console）与 JupyterLab 承担" },
  operator: {
    usage: "ptl operator（已迁移）",
    desc: "operator console 已迁 PTH——使用 pth web [--port p]",
  },
  hub: { usage: "ptl hub（已退役）", desc: "PTH 交互迁移到 pth CLI；容器运维用 pth up/tools/services；本地程序调试用 ptl program dev" },
  program: { usage: "ptl program dev <dir> [pi args…]", desc: "本地调试 agent 程序（pi 原生会话加载 systemPrompt + skills）" },
  stack: { usage: "ptl stack（deprecated）", desc: "容器生命周期统一由 pth up/status/logs/down + pth tools/services 管理" },
  "local-exec": {
    usage: "ptl local-exec（已迁移）",
    desc: "本地执行器已归 PTH——使用 pth local-exec（生命周期由 pth services 管理）",
  },
  onboard: { usage: "ptl onboard", desc: "首次导引向导：环境检查→配置→模板→验证" },
  doctor: { usage: "ptl doctor", desc: "完整健康检查 + 交互修复" },
};

export function printCommandHelp(cmd: string): void {
  const entry = COMMAND_HELP[cmd];
  if (!entry) {
    // 命名空间或未知：命名空间有则给命名空间帮助，否则全量帮助
    if (NAMESPACE_HELP[cmd]) { printNamespaceHelp(cmd); return; }
    printHelp();
    return;
  }
  console.log("");
  console.log(`  \x1b[1m${entry.usage}\x1b[0m`);
  console.log(`  \x1b[2m${entry.desc}\x1b[0m`);
  if (entry.flags) {
    console.log("");
    console.log("  选项:");
    for (const [f, d] of entry.flags) console.log(`    ${f.padEnd(28)} \x1b[2m${d}\x1b[0m`);
  }
  if (entry.examples) {
    console.log("");
    console.log("  示例:");
    for (const e of entry.examples) console.log(`    ${e}`);
  }
  console.log("");
}
