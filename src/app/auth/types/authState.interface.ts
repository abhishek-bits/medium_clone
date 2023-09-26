import {BackendErrorInterface} from 'src/app/shared/types/backendError.interface';
import {UserInterface} from 'src/app/shared/types/user.interface';

/*
 * For every single slice of data,
 * or every single feature,
 * we will create a slice of state.
 */
export interface AuthStateInterface {
  isSubmitting: boolean;
  user: UserInterface | null | undefined;
  isLoading: boolean;
  error: BackendErrorInterface | null;
}
