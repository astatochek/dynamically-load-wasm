import cors from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

const app = new Elysia()
  .use(cors())
  .use(
    staticPlugin({
      assets: "src/wasm",
      prefix: "/wasm",
      headers: {
        "Content-Type": "application/wasm",
      },
    }),
  )
  .get("/", () => ({ message: "Hello from Elysia + WASM server!" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
