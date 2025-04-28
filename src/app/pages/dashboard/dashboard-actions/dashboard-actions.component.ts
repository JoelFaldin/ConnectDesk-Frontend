import { MatIconModule } from '@angular/material/icon';

import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AddUsersComponent } from '@shared/users/users.component';
import { UserRole } from '@interfaces/auth-payload.interface';
import { ExcelService } from '@services/excel.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'dashboard-actions',
  imports: [MatIconModule, AddUsersComponent],
  templateUrl: './dashboard-actions.component.html',
})
export class DashboardActionsComponent {
  excelService = inject(ExcelService);
  authService = inject(AuthService);
  router = inject(Router);

  visible = signal(false);
  role: UserRole = UserRole.USER;

  ngOnInit() {
    this.role = this.authService.getRole() ?? UserRole.USER;
  }

  handleDownloadUserData() {
    this.excelService.downloadUserData().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'userdata.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    })
  }

  handleDownloadLogsData() {
    this.excelService.downloadLogsData().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'logsdata.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    })
  }

  handleUserNavigation() {
    this.router.navigate(["/users"]);
  }

  handleExcelNavigation() {
    this.router.navigate(["/excel"]);
  }

  toggleVisibility(value: boolean) {
    this.visible.set(value);
  }

  handleLogNavigation() {
    this.router.navigate(["/logs"])
  }
}
