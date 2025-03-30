import { Component, inject, resource } from '@angular/core';
import { Http } from './http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `@if (query.isLoading()) {
      Loading...
    } @else if (query.error()) {
      {{ query.error() | json }}
    } @else if (query.hasValue()) {
      {{ query.value() }}
    }`,
  standalone: true,
  imports: [JsonPipe],
})
export class AppComponent {
  http = inject(Http);

  query = resource({ loader: () => this.http.getHello() });
}
