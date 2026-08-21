# pi-triple-ptl

Pi-Triple **PTL（宿主机运维/本地执行）** 仓库：`ptl` CLI、mailbox、dev 容器扩展。

| 模块 | 位置 | 说明 |
|------|------|------|
| CLI/框架 | `packages/framework` | `@away_from/framework`，bin `ptl` → `dist/pit.js` |
| 邮箱扩展 | `packages/mailbox` | `@away_from/mailbox` |
| dev 容器扩展 | `packages/dev-container` | `@away_from/dev-container` |
| 扩展 | `extensions/` | `_shared` / `pit-control` / `pit-providers`（mailbox、dev-container 为包 symlink） |
| 配置 | `config/` | `settings.json` / `SYSTEM.md` |
| dev 镜像 | `deploy/Dockerfile.dev` | PTL 外接工具容器（python 生态） |

依赖 `@away_from/shared` 与 `@away_from/infra`（npm 包，见 [pi-triple-deps](https://github.com/Phenol1145/pi-triple-deps)）。
PTH 运行时在 [pi-triple-pth](https://github.com/Phenol1145/pi-triple-pth)；PTL→PTH 全部经 `pth` CLI / HTTP API v1，无包依赖。

## 快速开始

```bash
npm install        # 需先发布 @away_from/shared@1.5.0 / @away_from/infra@1.5.0
npm run build      # framework → mailbox → dev-container
npm test
node_modules/.bin/ptl --version
```

## 门禁

```bash
npm run lint
npm run build
npm test
```
