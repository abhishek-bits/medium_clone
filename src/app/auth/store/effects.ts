import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {authActions} from './actions';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {UserInterface} from 'src/app/shared/types/user.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {Router} from '@angular/router';

// registerEffect is basically a listener
// which listens to some action.
export const registerEffect = createEffect(
  (
    // This is the stream of all actions
    // happening in our application
    actions$ = inject(Actions),
    authService = inject(AuthService),
    // Inject our newly created persistence service
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      // Listening to action: register
      // React to register which is
      // the start of our registration process.
      ofType(authActions.register),
      switchMap(({request}) => {
        // make registration call to the API
        return authService.register(request).pipe(
          // If it was successfull, we get the response
          // which is the user object.
          map((user: UserInterface) => {
            /*
             * Just before we return the user object,
             * we should save the token to local storage.
             * Below line is enough to do this, but
             * this does not make the code re-usable.
             */
            // window.localStorage.setItem('accessToken', user.token);

            persistanceService.set('accessToken', user.token);

            return authActions.registerSuccess({user});
          }),
          // otherwise, we get empty respoonse
          // registerFailure method now expects a property of type error.
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({error: errorResponse.error.errors})
            );
          })
        );
      })
    );
  },
  {functional: true}
);

// We need to redirect to Home page on successfull registration
// So we create a new Effect which will
// - Listen to Register Success and when it happens,
// - Redirects us to Home Page.
export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      // We are waiting here for Success
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  // dispatch is set to false, because
  // we do not want this effect to dispatch anything
  // i.e. it will not have any return type
  {functional: true, dispatch: false}
);
