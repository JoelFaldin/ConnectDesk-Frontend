import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserDataResponse } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-search',
  imports: [InputTextModule, FormsModule, MatIconModule],
  templateUrl: './users-search.component.html',
})
export class UsersSearchComponent {
  userService = inject(UserService);

  value = signal('');

  handleSearch() {
    if (!this.value()) {
      console.log('nothing to search dude');
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
