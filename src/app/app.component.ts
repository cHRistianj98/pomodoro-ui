import { Component }        from '@angular/core';
import { CommonModule }     from '@angular/common';
import { RouterModule }     from '@angular/router';        // zamiast RouterOutlet
import { TimerComponent }   from './timer/timer.component';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,            // directives *ngIf, *ngFor
    RouterModule,            // directives <router-outlet>
    TimerComponent,          // standalone-component
    RegistrationComponent    // standalone-component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pomodoro-ui';
}
