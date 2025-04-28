import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent }        from './login/login.component';
import { TimerComponent } from "./timer/timer.component";
import { authGuard }             from './core/auth.guard';

export const routes: Routes = [
  { path: '',          component: LoginComponent },
  { path: 'register',  component: RegistrationComponent },
  { path: 'login',     component: LoginComponent },
  { path: 'timer',     component: TimerComponent, canActivate: [authGuard] },
  { path: '**',        redirectTo: '' }
];
