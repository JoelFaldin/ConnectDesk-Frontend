import { Component } from '@angular/core';

import { DataImportComponent } from './data-import/data-import.component';

@Component({
  selector: 'app-excel',
  imports: [DataImportComponent],
  templateUrl: './excel.component.html',
})
export default class ExcelComponent { }
