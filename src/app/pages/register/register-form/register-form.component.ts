import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '@services/user-service.service';

@Component({
  selector: 'register-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  public userService = inject(UserService);

  form = new FormGroup({
    name: new FormControl(),
    lastname: new FormControl(),
    rut: new FormControl(),
    email: new FormControl(),
    jobNumber: new FormControl(),
    contactNumber: new FormControl(),
    department: new FormControl(),
    direction: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  async handleSubmit() {
    const { confirmPassword, ...payload } = this.form.getRawValue();

    try {
      const res = await this.userService.register(payload);

      console.log(res);
    } catch (error) {
      console.log(error)
    }

  }
}
