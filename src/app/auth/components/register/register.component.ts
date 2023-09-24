import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {register} from '../../store/actions';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';

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
  // We'll import ReactiveFormsModule to get the
  // [formGroup] property for our form
  // and specify formControlName
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  // All our fields in the form will be defined.
  // Here we defined all the rules for our inputs.
  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Inject FormBuilder via constructor
  constructor(
    private formBuilder: FormBuilder,
    // Inject NgRx store so that
    // we can register our actions.
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
    this.store.dispatch(register({request}));
  }
}
