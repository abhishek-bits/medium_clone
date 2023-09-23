import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'register',
    // Provide a lazy loaded path. It means:
    // We want to lazy load: auth.routes
    // In our case, routes does the work of a module as well.
    // and inside the auth.routes, we have to call the
    // registerRoutes() method that we just created.
    loadChildren: () =>
      import('src/app/auth/auth.routes').then(
        (module) => module.registerRoutes
      ),
  },
];
