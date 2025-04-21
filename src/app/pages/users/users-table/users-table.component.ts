import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

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
  imports: [TableModule, CommonModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  userService = inject(UserService)
  dataSource: User[] = [];

  displayedColumns = ['Name', 'Last Name', 'Email', 'Rut', 'Job Number', 'Actions']

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
