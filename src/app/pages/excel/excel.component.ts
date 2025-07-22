import { SelectButtonModule } from 'primeng/selectbutton';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthService, private router: Router) { }

  role: UserRole = UserRole.USER;
  value = signal(1);

  stateOptions = [
    { label: 'Export', value: 2 }
  ];

  ngOnInit() {
    this.authService.checkBackendConnection().subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login'])
        }
      }
    })

    this.role = this.authService.getRole();

    if (this.role === 'ADMIN') {
      this.stateOptions = [
        { label: 'Import', value: 1 },
        { label: 'Export', value: 2 },
      ]
    }
  }
}
