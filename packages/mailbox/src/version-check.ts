/**
 * mailbox/version-check — 扩展侧更新检查（自 @away_from/shared 子路径再导出）。
 *
 * 实现已下沉到 @away_from/shared/extension-version-check（deps 仓），
 * 本文件保持 mailbox 对外 API 不变；extensions/_shared/version-check.ts 仍供
 * raw extensions 使用，并有同步守卫测试防止漂移。
 */
export {
  PIT_REPO,
  CACHE_TTL_MS,
  compareVersions,
  isUpdateAvailable,
  resolveInstalledPitVersion,
  checkForUpdates,
} from "@away_from/shared/extension-version-check";
export type { Shell } from "@away_from/shared/extension-version-check";
