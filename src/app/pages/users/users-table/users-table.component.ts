import { TableModule } from 'primeng/table';

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsSelectComponent } from './actions-select/actions-select.component';
import type { User, UserDataResponse } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'users-table',
  imports: [TableModule, CommonModule, ActionsSelectComponent],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  userService = inject(UserService)
  dataSource: User[] = [];

  displayedColumns = ['Name', 'Last Name', 'Email', 'Rut', 'Job Number', '']

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUserData().subscribe({
      next: (res: UserDataResponse) => {
        this.dataSource = res.content ?? [];
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
