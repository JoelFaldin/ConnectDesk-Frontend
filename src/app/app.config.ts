import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideCharts(withDefaultRegisterables())
  ]
};
