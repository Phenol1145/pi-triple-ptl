/**
 * framework/execution/docker-exec-backend.ts —— re-export 通用实现（execution/v1）。
 * 通用 backend 归属 @away_from/shared（三仓共享）；本文件保持 PTL 内部导入路径兼容。
 */
export { DockerExecBackend } from "@away_from/shared/execution";
export type { DockerExecBackendOptions } from "@away_from/shared/execution";
