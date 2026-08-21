# pi-triple-ptl

**Pi-Triple PTL** —— 宿主机侧运维/本地执行仓：`ptl` CLI、tmux 多环境共存、mailbox 与 dev 容器扩展，以及 dev 容器 / 本地执行器两个 `execution/v1` 执行面。

![node](https://img.shields.io/badge/node-%3E%3D22-green)
![tests](https://img.shields.io/badge/tests-464-brightgreen)
![version](https://img.shields.io/badge/version-1.5.0-blue)

- **定位**：让多个 pi 进程以模板隔离方式在 tmux 里并行、共存与切换；PTH（FRACTA engine 当前代码名）不是 PTL 的后端，而是经 `pth` CLI 调用的独立产品；PTL 托管的 dev 容器与本地执行器以 `execution/v1` 服务端接入 engine。
- **导航**：Quick Start · [模块](#模块) · [架构](#architecture) · [开发](#development) · [仓库定位](docs/POSITIONING.md) · [文档](#documentation)

## ✨ Quick Start

```bash
# 需先发布 @away_from/shared@1.5.0 / @away_from/infra@1.5.0（pi-triple-deps）
git clone https://github.com/Phenol1145/pi-triple-ptl.git
cd pi-triple-ptl
npm install          # postinstall 自动 build；node_modules/.bin/ptl 即装即用
node_modules/.bin/ptl --version   # ptl v1.5.0
```

## 模块

| 模块 | 位置 | 说明 |
|------|------|------|
| CLI/框架 | `packages/framework` | `@away_from/framework`，bin `ptl` → `bin/pit.js`（wrapper） |
| 邮箱扩展 | `packages/mailbox` | `@away_from/mailbox` |
| dev 容器扩展 | `packages/dev-container` | `@away_from/dev-container` |
| 扩展 | `extensions/` | `_shared` / `pit-control` / `pit-providers`（mailbox、dev-container 为包 symlink） |
| 配置 | `config/` | `settings.json` / `SYSTEM.md` |
| dev 镜像 | `deploy/Dockerfile.dev` | PTL 外接工具容器（python 生态） |

## Architecture

```
┌─────────────────────────────────────────────┐
│                ptl CLI（framework）          │
│  env · stack · program dev · session · TUI  │
└───────┬──────────────────────┬──────────────┘
        │ pi × tmux            │ pth CLI / HTTP API v1
        ▼                      ▼
  tmux 多环境共存          pi-triple-pth 仓（无包依赖）
```

依赖 `@away_from/shared` 与 `@away_from/infra`（npm 包）。安装/测试不触发 PTH 源码下载。engine 执行面拓扑与本地执行器开发指南见 [docs/fracta-engine-execution-topology.md](docs/fracta-engine-execution-topology.md)。

## Development

```bash
npm run lint   # framework/mailbox/dev-container tsc + product-boundaries + docs-links
npm run build  # framework → mailbox → dev-container
npm test       # 64 files / 464 tests，无需 Docker
```

## Roadmap

- ✅ v1.5.0：从主仓 filter-repo 拆出；framework bin wrapper 保证安装即用；464 tests 全绿
- 🚧 release 通道（`release.sh` / GitHub Releases）改写到 `pi-triple-ptl` 资产

## Documentation

- [docs/ptl](./docs/ptl) · [architecture](./docs/ptl/architecture.md) · [pth-task-submission](./docs/ptl/pth-task-submission.md)
- [Phase 3 拆仓报告（主仓归档）](https://github.com/Phenol1145/pi-triple/blob/main/docs/pth/phase3-ptl-split-report.md)
