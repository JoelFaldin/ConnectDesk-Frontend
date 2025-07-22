import { Component, OnInit } from '@angular/core';

import { TableFooterComponent } from './table-footer/table-footer.component';
import { TableLogsComponent } from './table-logs/table-logs.component';
import { AuthService } from '@services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  imports: [TableLogsComponent, TableFooterComponent],
  templateUrl: './logs.component.html',
})
export default class LogsComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.checkBackendConnection().subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login'])
        }
      }
    })
  }
}
