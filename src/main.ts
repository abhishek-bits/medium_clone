import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app/app.routes';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {isDevMode} from '@angular/core';

// root component here will be our app component.
bootstrapApplication(AppComponent, {
  // This code will load our appRoutes
  // Thereafter we'll lazy load all our links.
  providers: [
    provideRouter(appRoutes),
    // We need to import provideStore() from NgRx
    provideStore(),
    // We will include store-devtools from NgRx
    // So, that we are able to see application flow in Redux tab in Chrome.
    provideStoreDevtools({
      // maximum number of actions that we want to store
      maxAge: 25,
      // we should have logging when the application is not in development mode.
      logOnly: !isDevMode(),
      // to avoid too many actions
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
