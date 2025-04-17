import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { passwordsMatchValidator } from '@utils/passwords-match.validator';
import { RegisterPayload } from '@interfaces/auth-payload.interface';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  public authService = inject(AuthService);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern('\d\d?\.?\d{3}\.?\d{3}\-[kK\d]')]),
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
      const res = await this.authService.register(payload);

      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }
}
