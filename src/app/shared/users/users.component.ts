import { MatIconModule } from '@angular/material/icon';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Component, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CreateUserInterface, UserDataResponse } from '@interfaces/user.interface';
import { passwordsMatchValidator } from '@utils/passwords-match.validator';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'add-users',
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, DividerModule, PasswordModule, MatIconModule],
  templateUrl: './users.component.html',
})
export class AddUsersComponent {
  @Input({ required: true }) visible: WritableSignal<boolean> = signal(false);
  @Output() setVisible = new EventEmitter();

  userService = inject(UserService);
  toast = inject(ToastService);

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

          this.toast.success('Success', res.message ?? 'User added successfully!');
          this.userService.setUsers(dataSource);
        },
        error: (error) => {
          this.toast.error('Error', error.error.message ?? 'There was a problem with the server, try again later.');
          // console.error(error);
        }
      })

      this.visible.set(false);
    });
  }

  toggleVisibility() {
    this.setVisible.emit(false);
  }
}
