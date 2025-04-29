import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule }                from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "../core/auth.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error?: string;
  successMessage?: string;
  faSignInAlt = faSignInAlt;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.successMessage = history.state?.message;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.login(this.form.value).subscribe({
      next: (response) => {
        this.auth.token = response.accessToken;
        this.router.navigate(['/timer']);
      },
      error: err => {
        console.log('[Login] backend error:', err);
        this.error = 'Invalid username or password';
      }
    });

    console.log('Login:', this.form.value);
  }

  protected readonly faCheckCircle = faCheckCircle;
}
