import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { Component, inject } from '@angular/core';
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
export class DashboardSummaryComponent {
  userService = inject(UserService);
  userCount = toSignal(this.userService.getSummary(), { initialValue: 0 });

  logsService = inject(LogsService);
  logsCount = toSignal(this.logsService.getSummary(), { initialValue: 0 });

  authService = inject(AuthService);
  backendStatus = toSignal(this.authService.checkBackendConnection()
    .pipe(
      map((res: any) => res.status),
    )
    , { initialValue: false }
  );

  excelService = inject(ExcelService);
  excelSummary = toSignal(this.excelService.getSummary()
    .pipe(
      map((res: any) => {
        return {
          success: res.successCount,
          error: res.errorCount,
        }
      }),
    ),
    {
      initialValue: {
        success: 0,
        error: 0,
      }
    })
}
