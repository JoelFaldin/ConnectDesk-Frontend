import { MatIconModule } from '@angular/material/icon';

import { Component, inject } from '@angular/core';

import { UserRole } from '@interfaces/auth-payload.interface';
import { ExcelService } from '@services/excel.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'data-export',
  imports: [MatIconModule],
  templateUrl: './data-export.component.html',
})
export class DataExportComponent {
  excelService = inject(ExcelService);
  authService = inject(AuthService);

  role: UserRole = UserRole.USER;

  ngOnInit() {
    this.role = this.authService.getRole();
  }

  handleDownloadUserData() {
    this.excelService.downloadUserData().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'userdata.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

  handleDownloadLogs() {
    this.excelService.downloadLogsData().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'logsdata.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    })
  }
}
