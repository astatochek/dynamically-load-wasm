import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  InjectionToken,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';

export const BASE_URL = new InjectionToken('BaseUrl', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
  ],
};
