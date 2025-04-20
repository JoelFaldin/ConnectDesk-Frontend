import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { Component, inject, OnInit } from '@angular/core';

import { UserService } from '@services/user.service';

interface User {
  rut: string,
  names: string,
  lastNames: string,
  email: string,
  role: string,
  departments: string,
  directions: string,
  jobNumber: string,
  contact: string,
}

interface UserDataResponse {
  message?: string;
  content?: User[];
  totalData?: number;
}

@Component({
  selector: 'users-table',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule, MatPaginatorModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  userService = inject(UserService)
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  displayedColumns = ['name', 'email', 'rut', 'jobNumber', 'actions']

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUserData().subscribe({
      next: (res: UserDataResponse) => {
        this.dataSource = new MatTableDataSource<User>(res.content);
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
