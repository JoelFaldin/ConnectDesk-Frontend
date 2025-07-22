import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { ExcelService } from '@services/excel.service';
import { LogsService } from '@services/logs.service';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'dashboard-summary',
  imports: [MatIconModule],
  templateUrl: './dashboard-summary.component.html',
})
export class DashboardSummaryComponent implements OnInit {
  userService = inject(UserService);
  userCount = toSignal(this.userService.getSummary(), { initialValue: 0 });

  logsService = inject(LogsService);
  logsCount = toSignal(this.logsService.getSummary(), { initialValue: 0 });

  constructor(private router: Router) { }

  authService = inject(AuthService);
  backendStatus = 0;

  excelService = inject(ExcelService);
  excelSummary = toSignal(this.excelService.getSummary()
    .pipe(
      map((res: any) => {
        return {
          successCount: res.successCount,
          errorCount: res.errorCount,
        }
      }),
    ),
    {
      initialValue: {
        successCount: 0,
        errorCount: 0,
      }
    })

  ngOnInit() {
    this.authService.checkBackendConnection().subscribe({
      next: (res) => {
        this.backendStatus = res.status;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.log("backend error: ", error);
        }
      }
    })
  }
}
