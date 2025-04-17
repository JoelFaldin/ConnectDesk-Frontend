import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import type { LoginPayload } from '@interfaces/auth-payload.interface';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl(''),
  })

  async handleLogin() {
    const raw = this.form.getRawValue();
    const payload: LoginPayload = ({
      email: raw.email!,
      password: raw.password!
    })

    if (this.form.invalid) {
      for (const [key, control] of Object.entries(this.form.controls)) {
        if (control?.invalid) {
          console.log(`${key}:`);
          console.log(control.errors);
        }
      }
      return
    }

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}
