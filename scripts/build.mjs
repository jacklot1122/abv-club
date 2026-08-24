import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/client", { recursive: true });
await cp("index.html", "dist/client/index.html");
await cp("thanks.html", "dist/client/thanks.html");
await cp("assets", "dist/client/assets", { recursive: true });
await cp("worker/static.js", "dist/server/index.js");

console.log("ABV Club static site built successfully.");
