import { MatIconModule } from '@angular/material/icon';

import { Component, inject } from '@angular/core';

import { ExcelService } from '@services/excel.service';

@Component({
  selector: 'dashboard-actions',
  imports: [MatIconModule],
  templateUrl: './dashboard-actions.component.html',
})
export class DashboardActionsComponent {
  excelService = inject(ExcelService);

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
}
