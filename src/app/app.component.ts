import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  // Setting standalone to true means,
  // this component can now exist without a module.
  standalone: true,

  // Imports were previously methioned in modules.
  // But now we can add them in components as well.
  imports: [RouterOutlet],
})
export class AppComponent {}
