import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes) ,
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
      
    provideToastr(),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ]
};
