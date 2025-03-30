export type WorkerInMsg =
  | {
      type: 'loadWasm';
      wasmUrl: string;
    }
  | {
      type: 'calculateFactorial';
      num: number;
      id: string;
    };

const postWorkerMsg = (msg: WorkerOutMsg) => postMessage(msg);

export type WorkerOutMsg =
  | { type: 'wasmLoaded' }
  | { type: 'wasmLoadError' }
  | { type: 'factorialResult'; res: number; id: string }
  | { type: 'factorialError'; err: string; id: string };

let wasmInstance: WebAssembly.Instance | null = null;
let wasmFactorialFunction: ((n: number) => number) | null = null;

async function loadWasmModule(wasmUrl: string) {
  try {
    const wasm = await fetch(wasmUrl);
    const { instance } = await WebAssembly.instantiateStreaming(wasm);
    wasmInstance = instance;

    wasmFactorialFunction = (n: number) => {
      const res = Number((instance.exports['factorial'] as any)(n));
      if (res === 0) {
        throw 'Wasm function error';
      }
      return res;
    };
    postWorkerMsg({ type: 'wasmLoaded' });
  } catch (err) {
    postWorkerMsg({ type: 'wasmLoadError' });
  }
}

addEventListener('message', (event) => {
  const msg: WorkerInMsg = event.data;

  switch (msg.type) {
    case 'loadWasm':
      loadWasmModule(msg.wasmUrl);
      break;
    case 'calculateFactorial':
      if (wasmFactorialFunction) {
        try {
          const res = wasmFactorialFunction(msg.num);
          postWorkerMsg({ type: 'factorialResult', res, id: msg.id });
        } catch (e) {
          postWorkerMsg({
            type: 'factorialError',
            err: e instanceof Error ? e.message : String(e),
            id: msg.id,
          });
        }
      } else {
        postWorkerMsg({
          type: 'factorialError',
          err: 'WASM not loaded',
          id: msg.id,
        });
      }
  }
});
