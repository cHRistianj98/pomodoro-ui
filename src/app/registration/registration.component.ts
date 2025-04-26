import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from "./services/registration.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  form: FormGroup;

  isSubmitting = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
      },
      error: (err: { error: { message: string; }; }) => {
        this.isSubmitting = false;
        this.error = err?.error?.message ?? 'Coś poszło nie tak 🙁';
      }
    });
  }
}
