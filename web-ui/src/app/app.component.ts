import { Component, inject, resource, signal } from '@angular/core';
import { FactorialService } from './factorial.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div
        class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md border-2 border-purple-300"
      >
        <h2 class="text-2xl font-semibold text-center mb-6 text-purple-600">
          Factorial Calculator
        </h2>

        <div class="mb-4">
          <label
            for="factorial-input"
            class="block text-sm font-medium text-gray-700"
          >
            Enter a Number (0-20):
          </label>
          <input
            type="number"
            id="factorial-input"
            #input
            value="5"
            min="0"
            max="20"
            (keyup.enter)="num.set(input.valueAsNumber)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-xl p-2"
          />
        </div>

        <button
          (click)="num.set(input.valueAsNumber)"
          class="w-full bg-purple-500 transition duration-400 ease-in-out hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Calculate
        </button>

        @if (query.error()) {
          <div
            class="mt-4 text-red-600 border border-red-300 rounded-md p-3 bg-red-50"
          >
            {{ query.error() }}
          </div>
        } @else if (query.value()) {
          <div
            class="mt-4 text-green-600 border border-green-300 rounded-md p-3 bg-green-50"
          >
            factorial({{ num() }}) = <strong>{{ query.value() }}</strong>
          </div>
        } @else {
          <div class="mt-4 text-slate-500 rounded-md p-3">calculating...</div>
        }
      </div>
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  num = signal(5);

  factorial = inject(FactorialService);

  query = resource({
    request: () => this.num(),
    loader: ({ request: num }) => {
      if (isNaN(num)) {
        return Promise.resolve(void 0);
      }
      return this.factorial.calculate(num);
    },
  });
}
