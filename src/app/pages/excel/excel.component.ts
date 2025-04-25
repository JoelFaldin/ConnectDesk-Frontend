import { SelectButtonModule } from 'primeng/selectbutton';

import { FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';

import { DataImportComponent } from './data-import/data-import.component';
import { DataExportComponent } from './data-export/data-export.component';

@Component({
  selector: 'app-excel',
  imports: [FormsModule, SelectButtonModule, DataImportComponent, DataExportComponent],
  templateUrl: './excel.component.html',
})
export default class ExcelComponent {
  value = signal(1);

  stateOptions = [
    { label: 'Import', value: 1 },
    { label: 'Export', value: 2 },
  ]
}
