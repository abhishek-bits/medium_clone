import {Route} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';

export const registerRoutes: Route[] = [
  {
    // We don't have to specify any path here,
    // From the app.routes, this component
    // will be lazy loaded.
    path: '',
    component: RegisterComponent,
  },
];
