import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { Component } from '@angular/core';

@Component({
  selector: 'users-table',
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule, MatPaginatorModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  displayedColumns = ['name', 'actions']

  dataSource = new MatTableDataSource([
    { name: 'Alice', role: 'Admin', email: 'alice@email.com' },
    { name: 'Bob', role: 'User', email: 'bob@email.com' }
  ])

  handleAdd() {
    console.log('test')
  }
}
