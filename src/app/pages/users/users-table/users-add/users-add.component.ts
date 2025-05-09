import { MatIconModule } from '@angular/material/icon';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddUsersComponent } from "@shared/users/users.component";
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-add',
  imports: [ButtonModule, DialogModule, ReactiveFormsModule, DividerModule, PasswordModule, MatIconModule, AddUsersComponent],
  templateUrl: './users-add.component.html',

})
export class UsersAddComponent {
  userService = inject(UserService);

  visible = signal(false);

  toggleVisibility(value: boolean) {
    this.visible.set(value);
  }
}
