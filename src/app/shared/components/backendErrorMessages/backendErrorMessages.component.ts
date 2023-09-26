import {Component, Input} from '@angular/core';
import {BackendErrorInterface} from '../../types/backendError.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessages {
  // We have an input value to our HTML
  @Input() backendErrors: BackendErrorInterface = {};

  // Parsing backend error to a propert HTML format
  errorMessages: string[] = [];

  ngOnInit(): void {
    // Object.keys() returns keys that we have in the given JSON.
    this.errorMessages = Object.keys(this.backendErrors).map((key: string) => {
      const messages = this.backendErrors[key].join(' ');
      return `${key} ${messages}`;
    });
  }
}
