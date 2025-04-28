import { Component } from '@angular/core';

import { UsersTableComponent } from "./users-table/users-table.component";
import { TableFooterComponent } from './table-footer/table-footer.component';

@Component({
  selector: 'app-users',
  imports: [UsersTableComponent, TableFooterComponent],
  templateUrl: './users.component.html',
})
export default class UsersComponent { }
