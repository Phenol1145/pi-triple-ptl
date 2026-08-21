import { startLocalExecServer } from "./packages/framework/src/execution/local-exec-server.ts";
const r = await startLocalExecServer({
  token: "stack-lean-token",
  port: 8787,
  mappings: [{ hostRoot: "/data/workspaces", execRoot: "/tmp/pth-stack-ws" }],
});
console.log("LISTENING " + r.port);
