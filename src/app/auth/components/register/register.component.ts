import {Component} from '@angular/core';

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
})
export class RegisterComponent {}
