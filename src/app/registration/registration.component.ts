import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus, faSignInAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { RegistrationService } from "./services/registration.service";
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  form: FormGroup;
  faUserPlus = faUserPlus;
  faSignInAlt     = faSignInAlt;
  faCheckCircle   = faCheckCircle;

  isSubmitting = false;
  error?: string;
  successMessage?: string;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.form = this.fb.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[.,!@]).{8,}$/)
          ]
        ],
        confirmPassword: [
          '',
          [Validators.required,]
        ]
      },
      {
        validators: [this.passwordMatchValidator]
      }
    );
  }

  private passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password && confirm && password !== confirm
      ? {passwordMismatch: true}
      : null;
  };

  ngOnInit() {
    this.successMessage = history.state?.message;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.registrationService.register(this.form.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(
          ['/login'],
          {
            state: {
              message: 'Registration successful! Please log in.'
            }
          }
        );
      },
      error: (err: { error: { message: string; }; }) => {
        this.isSubmitting = false;
        this.error = err?.error?.message ?? 'Something went wrong 🙁';
      }
    });
  }
}
