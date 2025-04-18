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
  displayedColumns = ['name', 'email', 'rut', 'jobNumber', 'actions']

  dataSource = new MatTableDataSource([
    { name: 'Alice', role: 'Admin', email: 'alice@email.com', rut: '21.261.340-1', jobNumber: '900001111' },
    { name: 'Bob', role: 'User', email: 'bob@email.com', rut: '21.298.571-k', jobNumber: '900001112' }
  ])

  handleAdd() {
    console.log('test')
  }
}
