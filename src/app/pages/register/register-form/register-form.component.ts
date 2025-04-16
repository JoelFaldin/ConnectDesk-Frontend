import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RegisterPayload } from '@interfaces/register-payload.interface';
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
    const payload: RegisterPayload = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      rut: this.form.value.rut,
      email: this.form.value.email,
      jobNumber: this.form.value.jobNumber,
      contactNumber: this.form.value.contactNumber,
      department: this.form.value.department,
      direction: this.form.value.direction,
      password: this.form.value.password,
    };

    try {
      const res = await this.userService.register(payload);

      console.log(res);
    } catch (error) {
      console.log(error)
    }

  }
}
