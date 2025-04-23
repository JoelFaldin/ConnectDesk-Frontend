import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { inject } from '@angular/core';

import { UserDataResponse } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-reset',
  imports: [MatIconModule],
  templateUrl: './users-reset.component.html',
})
export class UsersResetComponent {
  userService = inject(UserService);

  handleReset() {
    this.userService.getUserData().subscribe({
      next: (res: UserDataResponse) => {
        this.userService.setUsers(res.content ?? []);
      }
    })
  }
}
