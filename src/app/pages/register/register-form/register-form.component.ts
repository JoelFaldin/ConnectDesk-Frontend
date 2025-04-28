import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { passwordsMatchValidator } from '@utils/passwords-match.validator';
import { RegisterPayload } from '@interfaces/auth-payload.interface';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  authService = inject(AuthService);
  toast = inject(ToastService);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2})\.?(\d{3})\.?(\d{3})\-([kK\d])$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    jobNumber: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    direction: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, { validators: passwordsMatchValidator }
  );

  async handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      for (const [key, control] of Object.entries(this.form.controls)) {
        if (control?.invalid) {
          console.log(`${key}:`);
          console.log(control.errors);
        }
      }

      if (this.form.errors?.['passwordDismatch']) {
        this.toast.warn('Password dismatch', 'Passwords do not match. Try again!');
      }

      this.toast.warn('Warning', 'There are errors in the form, correct them to continue.');

      return
    }
    const raw = this.form.getRawValue();

    const payload: RegisterPayload = {
      name: raw.name!,
      lastname: raw.lastname!,
      rut: raw.rut!,
      email: raw.email!,
      jobNumber: parseFloat(raw.jobNumber!),
      contactNumber: parseFloat(raw.contactNumber!),
      department: raw.department!,
      direction: raw.direction!,
      password: raw.password!,
    }


    this.authService.register(payload).subscribe({
      next: (res) => {
        this.toast.success('Registration', 'User registered! Redirecting...');
        this.toast.info('Info', 'Please, log in with your new credentials');
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.toast.error('Server error', 'There was a server error, try again later.');
        // console.error(error);
      }
    })
  }
}
