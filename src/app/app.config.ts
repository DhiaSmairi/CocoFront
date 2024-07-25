import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings } from 'ng-recaptcha';
import { provideClientHydration } from '@angular/platform-browser';



export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideAnimationsAsync(),provideHttpClient(), provideAnimationsAsync(), provideClientHydration(),provideToastr(),]

};

