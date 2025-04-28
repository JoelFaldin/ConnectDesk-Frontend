import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from 'primeng/fileupload';

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelService } from '@services/excel.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'data-import',
  imports: [CommonModule, FileUploadModule, MatIconModule],
  templateUrl: './data-import.component.html',
})
export class DataImportComponent {
  excelService = inject(ExcelService);
  toast = inject(ToastService);

  uploadedFiles: any;

  onUpload(event: any) {
    const file = event.files[0];

    const formData = new FormData();
    formData.append('excelFile', file);

    this.excelService.uploadExcelFile(formData).subscribe({
      next: (res: any) => {
        this.toast.success('Success', res.message ?? 'Excel file uploaded successfully!');
      },
      error: (error) => {
        this.toast.error('Error', error.error.message ?? 'There was a problem on the server, try again later.');
        // console.error(error);
      }
    })
  }

  handleSelect(event: any) {
    this.uploadedFiles = event.files[0];
  }

  handleTemplate() {
    this.excelService.downloadTemplate().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'template.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    })
  }
}
