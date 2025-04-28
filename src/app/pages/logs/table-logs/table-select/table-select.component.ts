import { SelectButtonModule } from 'primeng/selectbutton';

import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToastService } from '@services/toast.service';
import { LogsService } from '@services/logs.service';

@Component({
  selector: 'table-select',
  imports: [FormsModule, SelectButtonModule],
  templateUrl: './table-select.component.html',
})
export class TableSelectComponent {
  logService = inject(LogsService);
  toast = inject(ToastService);

  statusSelector = signal(1);

  selectOptions = [
    { name: 'All Logs', value: 1 },
    { name: 'Success', value: 201 },
    { name: 'Ok', value: 200 },
    { name: 'Warning', value: 401 },
    { name: 'Error', value: 400 },
  ];

  onSelectChange(event: any) {
    if (!event.value) {
      return
    }

    this.logService.getByCode(event.value).subscribe({
      next: (res: any) => {
        this.logService.setLogData(res.content ?? []);

        this.logService.setPaginationData({
          code: event.value ?? null,
          total: res.total,
          pageSize: res.pageSize,
          page: res.page! - 1,
        });
      },
      error: (error) => {
        this.toast.error('Error', error.error.message ?? 'There was a problem with the server, try again later.');
        // console.error(error);
      },
    });
  }
}
