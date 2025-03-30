import { $ } from "bun";

const zigFilePath = "src/zig/factorial.zig";
const wasmFilepath = "src/wasm/factorial.wasm";

try {
  const out =
    await $`zig build-exe ${zigFilePath} -target wasm32-freestanding -fno-entry -rdynamic -O ReleaseFast -femit-bin=${wasmFilepath}`;
  console.log(out.stdout.toString());
} catch (err: any) {
  console.log(`Failed with exit code ${err.exitConde}`);
  console.log(err.stdout.toString());
  console.log(err.stderr.toString());
}
