import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {authActions} from '../../store/actions';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {RouterLink} from '@angular/router';
import {selectError, selectIsSubmitting} from '../../store/reducers';
import {AuthStateInterface} from '../../types/authState.interface';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {combineLatest} from 'rxjs';
import {BackendErrorMessages} from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  // Instead of directly specifying our component
  // It makes a lot of sense to prefix all our components
  // somehow uniquely. Thus, we can add a prefix.
  // Here: mc simply means medium clone.
  // This helps us distinguish that this is our custom component.
  selector: 'mc-register',
  templateUrl: './register.component.html',
  // We will specify the property standalone to true
  // in all our components because we want to use
  // all our components without modules.
  standalone: true,
  imports: [
    // We'll import ReactiveFormsModule to get the
    // [formGroup] property for our form
    // and specify formControlName
    ReactiveFormsModule,
    // Since, we are using StandAlone components,
    // our links won't come on the browser so
    // we'll import RouterLink to have that feature.
    RouterLink,
    // To allow observable subscription using aync pipe
    CommonModule,
    BackendErrorMessages,
  ],
})
export class RegisterComponent {
  // All our fields in the form will be defined.
  // Here we defined all the rules for our inputs.
  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  /*
  // '$' specifies we are getting our data as a stream
  // This becomes an observable which we can subscribe to
  // and every single change that happens in State
  // will change this property.
  isSubmitting$ = this.store.select(selectIsSubmitting);

  // Add observable for Backend Errors
  backendError$ = this.store.select(selectError);
  */

  // Imagine that we have lot of observables.
  // With that, we will have separate async pipe for every observable.
  // This is why it makes a lot of sense to group all these selects
  // with combineLatest. This will help us to scale our code indefinetely.
  // combineLatest simply resolves every single stream with a value
  // which means we will have every single value from every single
  // observable inside the data property directly like local property.
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendError: this.store.select(selectError),
  });

  // Inject FormBuilder via constructor
  constructor(
    private formBuilder: FormBuilder,
    // Inject NgRx store so that
    // we can register our actions.
    // Additionally, we specify the type of our State.
    // So that NgRx knows what properties do we have
    // inside our global state.
    // However, since, we are now using selectors
    // that was generated using NgRx automatically (createFeature())
    // we no longer need to specify the type for Store
    private store: Store
  ) {}

  onSubmit(): void {
    console.log('form', this.form.getRawValue());

    // Registering our Register Action (defined in store/actions.ts) here:
    // This is basically how we notify NgRx that an event was fired (or something happened)
    // Although passing just register, without parantheses, is not useful.
    // We should provide our form information inside our register action.
    // The problem here is that, we want to have strict typing
    // But actually our register action is related to an API call.
    // i.e. it must trigger an API call.
    // Currently if we click Submit button on the Register page,
    // then console shows the below output:
    // Object { username: "", email: "", password: "" }
    // But, the response that must be send to the API: POST /api/users
    // should be in the exact same format as mentioned in the RealWorld documentation
    // Hence, we'll make an interface to match the reponse structure.
    // Thus, after configuring the required type in store/actions.ts
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({request}));
  }
}
