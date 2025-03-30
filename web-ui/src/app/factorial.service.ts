import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, Subject } from 'rxjs';
import { WorkerInMsg, WorkerOutMsg } from './wasm.worker';

@Injectable({ providedIn: 'root' })
export class FactorialService {
  private worker: Worker | undefined;
  private isInitialized = new BehaviorSubject(false);
  private res$ = new Subject<
    Extract<WorkerOutMsg, { type: 'factorialResult' | 'factorialError' }>
  >();
  private url = 'http://localhost:3000/wasm/factorial.wasm';

  constructor() {
    this.worker = new Worker(new URL('./wasm.worker', import.meta.url));

    this.worker.onmessage = (event) => {
      const msg: WorkerOutMsg = event.data;

      switch (msg.type) {
        case 'wasmLoaded':
          this.isInitialized.next(true);
          break;
        case 'wasmLoadError':
          break;
        case 'factorialResult':
        case 'factorialError':
          this.res$.next(msg);
          break;
      }
    };

    this.post({ type: 'loadWasm', wasmUrl: this.url });
  }

  async calculate(num: number): Promise<number> {
    if (!this.isInitialized.value) {
      await firstValueFrom(this.isInitialized.pipe(filter(Boolean)));
    }

    const id = crypto.randomUUID();

    const resPromise = firstValueFrom(
      this.res$.pipe(filter((msg) => msg.id === id)),
    );

    this.post({ type: 'calculateFactorial', num, id });

    const res = await resPromise;

    if (res.type === 'factorialResult') {
      return res.res;
    }

    throw res.err;
  }

  private post(msg: WorkerInMsg) {
    this.worker?.postMessage(msg);
  }
}
