import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegistrationService } from "./services/registration.service";
import { RegisterRequestDto } from "./data/register-request.dto";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const registerRequestDto: RegisterRequestDto = this.registrationForm.value;
      this.registrationService.register(registerRequestDto).subscribe(
        response => {
          console.log('Registration successful', response);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
}
