import { SelectButtonModule } from 'primeng/selectbutton';

import { FormsModule } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';

import { DataImportComponent } from './data-import/data-import.component';
import { DataExportComponent } from './data-export/data-export.component';
import { AuthService } from '@services/auth.service';
import { UserRole } from '@interfaces/auth-payload.interface';

@Component({
  selector: 'app-excel',
  imports: [FormsModule, SelectButtonModule, DataImportComponent, DataExportComponent],
  templateUrl: './excel.component.html',
})
export default class ExcelComponent {
  authService = inject(AuthService);

  role: UserRole = UserRole.USER;
  value = signal(1);

  stateOptions = [
    { label: 'Export', value: 2 }
  ];

  ngOnInit() {
    this.role = this.authService.getRole();

    if (this.role === 'ADMIN') {
      this.stateOptions = [
        { label: 'Import', value: 1 },
        { label: 'Export', value: 2 },
      ]
    }
  }
}
