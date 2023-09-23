import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    console.log('form', this.form.getRawValue());
  }
}
