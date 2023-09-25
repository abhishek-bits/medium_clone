import {createSelector} from '@ngrx/store';
import {AuthStateInterface} from '../types/authState.interface';

// In the below feature:
// state: refers to our global state inside NgRx
// additionally, select feature gets our auth feature slice.
export const selectFeature = (state: {auth: AuthStateInterface}) => state.auth;

// We want to create specific selector for our submiited property
export const selectIsSubmitting = createSelector(
  selectFeature,
  (state) => state.isSubmitting
);
