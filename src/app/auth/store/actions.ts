import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {UserInterface} from 'src/app/shared/types/user.interface';
import {BackendErrorInterface} from 'src/app/shared/types/backendError.interface';

// Create Register Action
// [Auth] Register ? Why are we doing like this?
// Because essentially all our actions for NgRx
// are global which means whole applications has
// the least of all the sections,
// which is why they are unique which means,
// if we are naming our action like "Submit"
// then we will not be able to use the same name
// in some other feature.
// This is why here, we are using namespaces []
// We are simply prefixing the action with just a string
// [Auth] simply means this feature is written
// within the component named "Auth".
// In other words, all actions which were written for Auth feature
// we need to prefix them with [Auth]
/*
export const register = createAction(
  '[Auth] Register',

  // How to we define the type of the data to be sent to the POST API: /api/users
  // Props is the way using which we define the standard
  // or expected structure of the data to be sent to the POST API: /api/users
  // Here, the type is an object which has a nested object of type RegisterRequestInterface
  props<{request: RegisterRequestInterface}>()
);
*/

// Effects Configuration :-
// Instead of creating different actions
// each for register, registerSuccess, and registerFailure,
// we'll use NgRx to write better code.
export const authActions = createActionGroup({
  // Namespace [Auth] that we wrote in our stream
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register Success': props<{user: UserInterface}>(),
    'Register Failure': props<{error: BackendErrorInterface}>(),
  },
});
