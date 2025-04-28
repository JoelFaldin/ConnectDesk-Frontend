import { TableModule } from 'primeng/table';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersActionsComponent } from './users-actions/users-actions.component';
import { UsersSearchComponent } from './users-search/users-search.component';
import { UsersResetComponent } from './users-reset/users-reset.component';
import type { User, UserDataResponse } from '@interfaces/user.interface';
import { UsersAddComponent } from './users-add/users-add.component';
import { UserRole } from '@interfaces/auth-payload.interface';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'users-table',
  imports: [TableModule, CommonModule, UsersSearchComponent, UsersResetComponent, UsersAddComponent, UsersActionsComponent],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  toast = inject(ToastService);

  dataSource: User[] = [];
  role: UserRole = UserRole.USER;

  displayedColumns = ['Name', 'Last Name', 'Email', 'Rut', 'Job Number', '']

  ngOnInit() {
    this.role = this.authService.getRole();

    this.userService.users$.subscribe(users => {
      this.dataSource = users;
    })

    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUserData().subscribe({
      next: (res: UserDataResponse) => {
        this.dataSource = res.content ?? [];

        this.userService.setUsers(this.dataSource);
        this.userService.setPaginationData({
          page: res.page!,
          pageSize: res.showing!,
          total: res.total!
        });
      },
      error: (error) => {
        this.toast.error('Error', error.error.message ?? 'There was a problem with the server, try again later.');
        // console.error(error);
      }
    })
  }
}
