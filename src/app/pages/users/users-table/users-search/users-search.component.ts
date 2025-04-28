import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserDataResponse } from '@interfaces/user.interface';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-search',
  imports: [InputTextModule, FormsModule, MatIconModule],
  templateUrl: './users-search.component.html',
})
export class UsersSearchComponent {
  userService = inject(UserService);
  toast = inject(ToastService);

  value = signal('');

  handleSearch() {
    if (!this.value()) {
      this.toast.warn('Warning', 'You should input something to search!');
      return;
    }

    this.userService.getUserData(this.value()).subscribe({
      next: (res: UserDataResponse) => {
        this.userService.setUsers(res.content ?? []);

        this.value.set('');
      },
    });
  }
}
