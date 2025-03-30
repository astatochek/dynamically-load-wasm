import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Http {
  private start = 'http://localhost:3000/';
  private http = inject(HttpClient);
  getHello() {
    return firstValueFrom(
      this.http.get('http://localhost:3000/hello', { responseType: 'text' }),
    );
  }
}
