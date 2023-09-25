import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {authActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {UserInterface} from 'src/app/shared/types/user.interface';

// registerEffect is basically a listener
// which listens to some action.
export const registerEffect = createEffect(
  (
    // This is the stream of all actions
    // happening in our application
    actions$ = inject(Actions),
    authService = inject(AuthService)
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
            return authActions.registerSuccess({user});
          }),
          // otherwise, we get empty respoonse
          catchError(() => {
            return of(authActions.registerFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
