import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { UserService } from '@services/user-service.service';
import type { LoginPayload } from '@interfaces/auth-payload.interface';

@Component({
  selector: 'login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  public userService = inject(UserService);

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

    try {
      const res = await this.userService.login(payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
