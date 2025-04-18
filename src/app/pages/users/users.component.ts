import { Component } from '@angular/core';
import { UsersTableComponent } from "./users-table/users-table.component";

@Component({
  selector: 'app-users',
  imports: [UsersTableComponent],
  templateUrl: './users.component.html',
})
export default class UsersComponent { }
