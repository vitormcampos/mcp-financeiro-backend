/// <reference types="@angular/localize" />

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

import { provideMarkdown } from 'ngx-markdown';
import { authErrorInterceptor } from './app/interceptors/httpclient.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authErrorInterceptor])),
    provideMarkdown(),
  ],
}).catch((err) => console.error(err));
