import { ButtonModule } from 'primeng/button';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import type { LoginPayload, LoginResponsePayload } from '@interfaces/auth-payload.interface';
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule, ButtonModule, MatIconModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  authService = inject(AuthService);
  toast = inject(ToastService);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  })

  visible = signal("password");

  handleShowPassword() {
    if (this.visible() === "password") {
      this.visible.set("text");
    } else {
      this.visible.set("password");
    }
  }

  async handleLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      for (const [key, control] of Object.entries(this.form.controls)) {
        if (control?.invalid) {
          console.log(`${key}:`);
          console.log(control.errors);
        }
      }
      return
    }

    const raw = this.form.getRawValue();
    const payload: LoginPayload = ({
      email: raw.email!,
      password: raw.password!
    })

    this.authService.login(payload).subscribe({
      next: (res: LoginResponsePayload) => {
        this.toast.success(res.message, 'Success');
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.toast.error('Error', error.error.message ?? 'There was a problem in the server, try again later.');
        // console.error(error)
      }
    })
  }

  handleGuestLogin() {
    this.authService.loginAsGuest();
    this.router.navigate(['/dashboard']);
  }
}
