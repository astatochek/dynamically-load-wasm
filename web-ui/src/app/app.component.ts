import { Component, inject, resource, signal } from '@angular/core';
import { FactorialService } from './factorial.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="min-h-screen flex items-center justify-center bg-sumiInk1">
      <div
        class="w-full max-w-md p-8 rounded-lg shadow-xl bg-sumiInk0 border-2 border-oniViolet"
      >
        <h1 class="text-3xl font-bold text-center mb-6 text-oldWhite">
          Factorial Calculator
        </h1>
        <form
          (submit)="$event.preventDefault(); num.set(input.valueAsNumber)"
          class="space-y-6"
        >
          <div class="space-y-2">
            <label
              for="factorial-input"
              class="block text-fujiWhite font-medium"
            >
              Enter a number:
            </label>
            <input
              type="number"
              id="factorial-input"
              #input
              value="5"
              min="1"
              max="20"
              class="w-full px-4 py-2 rounded-md bg-sumiInk2 text-oldWhite border border-sumiInk4 focus:outline-none focus:ring-2 focus:ring-crystalBlue"
              placeholder="Enter a number"
            />
          </div>

          <button
            type="submit"
            class="w-full py-2 px-4 bg-waveAqua2 hover:bg-springGreen transition-colors duration-300 text-sumiInk1 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-crystalBlue"
          >
            Calculate
          </button>
        </form>

        @if (query.error()) {
          <div class="mt-6 p-4 rounded-md bg-winterRed border border-lotusRed2">
            <h2 class="text-lg font-medium text-fujiWhite">Error:</h2>
            <p class="text-2xl font-bold text-lotusRed3">{{ query.error() }}</p>
          </div>
        } @else {
          <div
            class="mt-6 p-4 rounded-md bg-winterGreen border border-autumnGreen"
          >
            <h2 class="text-lg font-medium text-fujiWhite">Result:</h2>
            <p class="text-2xl font-bold text-springGreen">
              {{ query.value() }}
            </p>
          </div>
        }
      </div>
    </main>
  `,
})
export class AppComponent {
  num = signal(5);

  factorial = inject(FactorialService);

  query = resource({
    request: () => this.num(),
    loader: ({ request: num }) => {
      if (isNaN(num)) {
        return Promise.resolve('...');
      }
      return this.factorial.calculate(num).then(String);
    },
    defaultValue: '...',
  });

  onSibmit(event: SubmitEvent, value: number) {
    event.preventDefault();
    this.num.set(value);
  }
}
