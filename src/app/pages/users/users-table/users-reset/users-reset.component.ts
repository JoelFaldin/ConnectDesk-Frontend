import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { inject } from '@angular/core';

import { UserDataResponse } from '@interfaces/user.interface';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-reset',
  imports: [MatIconModule],
  templateUrl: './users-reset.component.html',
})
export class UsersResetComponent {
  userService = inject(UserService);
  toast = inject(ToastService);

  handleReset() {
    this.userService.getUserData().subscribe({
      next: (res: UserDataResponse) => {
        this.userService.setUsers(res.content ?? []);
      },
      error: (error) => {
        this.toast.error('Error', error.error.message ?? 'There was a problem with the server, try again later.');
      }
    })
  }
}
