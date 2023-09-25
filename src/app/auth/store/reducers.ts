import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';
import {register} from './actions';

// slice of data for our auth feature.
const initialState: AuthStateInterface = {
  isSubmitting: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    // Once the submit button is clicked,
    // change the isSubmitting property to false.
    on(register, (state) => ({...state, isSubmitting: true}))
  ),
});

// Here we have used aliasing to sepcify the object parameters
export const {name: authFeatureKey, reducer: authReducer} = authFeature;
