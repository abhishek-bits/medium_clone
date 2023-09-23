import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app/app.routes';

// root component here will be our app component.
bootstrapApplication(AppComponent, {
  // This code will load our appRoutes
  // Thereafter we'll lazy load all our links.
  providers: [provideRouter(appRoutes)],
});
