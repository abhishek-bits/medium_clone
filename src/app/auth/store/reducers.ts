import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';
import {authActions} from './actions';

// slice of data for our auth feature.
const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  user: undefined,
  error: null,
};

// Create Feature creates for us:
// - a feature key (name)
// - a reducer
// - a bunch of selectors
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    // Once the submit button is clicked,
    // change the isSubmitting property to false.
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      error: null, // on sending the registration request, errors are initially null.
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      user: action.user,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      error: action.error,
    }))
  ),
});

// Here we have used aliasing to sepcify the object parameters
export const {
  name: authFeatureKey,
  reducer: authReducer,
  // create selector for variable isSubmitting
  selectIsSubmitting,
  // create selectors to capture backend response/errors
  selectIsLoading,
  selectUser,
  selectError,
} = authFeature;
