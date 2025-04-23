import { TableModule } from 'primeng/table';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersActionsComponent } from './users-actions/users-actions.component';
import { UsersSearchComponent } from './users-search/users-search.component';
import { UsersResetComponent } from './users-reset/users-reset.component';
import type { User, UserDataResponse } from '@interfaces/user.interface';
import { UsersAddComponent } from './users-add/users-add.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-table',
  imports: [TableModule, CommonModule, UsersSearchComponent, UsersResetComponent, UsersAddComponent, UsersActionsComponent],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  userService = inject(UserService)
  dataSource: User[] = [];

  displayedColumns = ['Name', 'Last Name', 'Email', 'Rut', 'Job Number', '']

  ngOnInit() {
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
      },
      error: (error) => {
        console.log('there was an error...', error);
      }
    })
  }

  handleAdd() {
    console.log('test')
  }
}
