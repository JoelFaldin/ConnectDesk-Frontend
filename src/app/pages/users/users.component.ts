import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersTableComponent } from "./users-table/users-table.component";
import { TableFooterComponent } from './table-footer/table-footer.component';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users',
  imports: [UsersTableComponent, TableFooterComponent],
  templateUrl: './users.component.html',
})
export default class UsersComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkBackendConnection().subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    })
  }
}
