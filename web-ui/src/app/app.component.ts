import { Component, inject, resource } from '@angular/core';
import { Http } from './http';
import { JsonPipe } from '@angular/common';
import { FactorialService } from './factorial.service';

@Component({
  selector: 'app-root',
  template: `@if (query.isLoading()) {
      Loading...
    } @else if (query.error()) {
      {{ query.error() | json }}
    } @else if (query.hasValue()) {
      {{ query.value() | json }}
    }`,
  standalone: true,
  imports: [JsonPipe],
})
export class AppComponent {
  http = inject(Http);

  factorial = inject(FactorialService);

  query = resource({ loader: () => this.http.getHello() });

  constructor() {
    this.test();
  }

  async test() {
    const res = await this.factorial.calculate(6);
    console.log(res);
  }
}
