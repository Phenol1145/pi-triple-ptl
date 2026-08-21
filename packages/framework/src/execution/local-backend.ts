/**
 * framework/execution/local-backend.ts —— re-export 通用实现（execution/v1）。
 * 通用 backend 归属 @away_from/shared（三仓共享）；本文件保持 PTL 内部导入路径兼容。
 */
export { LocalBackend } from "@away_from/shared/execution";
export type { LocalBackendOptions } from "@away_from/shared/execution";
