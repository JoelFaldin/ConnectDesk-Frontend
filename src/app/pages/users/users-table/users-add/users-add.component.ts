import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, signal, inject } from '@angular/core';

import { CreateUserInterface, UserDataResponse } from '@interfaces/user.interface';
import { passwordsMatchValidator } from '@utils/passwords-match.validator';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-add',
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, DividerModule, PasswordModule],
  templateUrl: './users-add.component.html',

})
export class UsersAddComponent {
  userService = inject(UserService)

  visible = signal(false);

  form = new FormGroup({
    names: new FormControl('', Validators.required),
    lastNames: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2})\.?(\d{3})\.?(\d{3})\-([kK\d])$/)]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    jobNumber: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    departments: new FormControl('', Validators.required),
    directions: new FormControl('', Validators.required),
  }, { validators: passwordsMatchValidator }
  );

  handleAddUser() {
    const raw = this.form.getRawValue();

    const payload: CreateUserInterface = {
      names: raw.names!,
      lastNames: raw.lastNames!,
      rut: raw.rut!,
      email: raw.email!,
      role: raw.role!,
      jobNumber: raw.jobNumber!,
      contact: raw.contact!,
      departments: raw.departments!,
      directions: raw.directions!,
      password: raw.password!,
    }

    this.userService.createUser(payload).subscribe(res => {
      this.userService.getUserData().subscribe({
        next: (res: UserDataResponse) => {
          const dataSource = res.content ?? [];

          this.userService.setUsers(dataSource);
        },
        error: (error) => {
          console.log('there was an error...', error);
        }
      })

      this.visible.set(false);
    });
  }

  showModal() {
    this.visible.set(true);
  }
}
