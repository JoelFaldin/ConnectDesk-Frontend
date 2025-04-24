import { SelectButtonModule } from 'primeng/selectbutton';

import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LogsService } from '@services/logs.service';

@Component({
  selector: 'table-select',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './table-select.component.html',
})
export class TableSelectComponent {
  logService = inject(LogsService);

  statusSelector = signal(1);

  selectOptions = [
    { name: 'All Logs', value: 1 },
    { name: 'Success', value: 201 },
    { name: 'Ok', value: 200 },
    { name: 'Warning', value: 401 },
    { name: 'Error', value: 304 },
  ];

  onSelectChange(event: any) {
    this.logService.getByCode(event.value).subscribe({
      next: (res: any) => {
        this.logService.setLogData(res.content ?? []);

        this.logService.setPaginationData({
          total: res.total,
          pageSize: res.pageSize,
          page: res.page! - 1,
        });
      }
    });
  }
}
