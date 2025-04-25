import { MatIconModule } from '@angular/material/icon';

import { Component, inject } from '@angular/core';

import { ExcelService } from '@services/excel.service';

@Component({
  selector: 'data-export',
  imports: [MatIconModule],
  templateUrl: './data-export.component.html',
})
export class DataExportComponent {
  excelService = inject(ExcelService);

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
    console.log('downloading logs :D');
  }
}
