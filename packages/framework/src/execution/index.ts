/**
 * framework/execution —— PTL 侧 execution/v1 + v1.1 backend 实现。
 */
export { LocalBackend, type LocalBackendOptions } from "./local-backend.js";
export { DockerExecBackend, type DockerExecBackendOptions } from "./docker-exec-backend.js";
export { LocalSpawnBackend, type LocalSpawnBackendOptions } from "./local-spawn-backend.js";
export { startLocalExecServer, type LocalExecServerOptions, type RunningLocalExecServer } from "./local-exec-server.js";
