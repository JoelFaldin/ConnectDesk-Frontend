import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PaginationInterface } from '@interfaces/pagination.interface';
import { LogsDataResponse } from '@interfaces/logs.interface';
import { LogsService } from '@services/logs.service';

@Component({
  selector: 'logs-table-footer',
  imports: [FormsModule, SelectModule, PaginatorModule],
  templateUrl: './table-footer.component.html',
})
export class TableFooterComponent {
  logService = inject(LogsService)
  paginationData: Partial<PaginationInterface> = {};

  page = 0;
  pageSize = 10;

  options = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ];

  ngOnInit() {
    this.logService.pagination$.subscribe(data => {
      this.paginationData = data;
    })
  }

  onPageSizeChange(event: any) {
    this.logService.setPaginationData({
      pageSize: event,
    })

    this.pageSize = event;
    this.page = 0;

    this.logService.getByCode(1, this.page, this.pageSize).subscribe({
      next: (res: LogsDataResponse) => {
        this.logService.setLogData(res.content!);

        this.logService.setPaginationData({
          total: res.total,
          pageSize: res.pageSize,
          page: res.page! - 1,
        });
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.logService.setPaginationData({
      page: event.page,
    });

    this.page = event.page!;

    const paginationData = this.logService.getPagination();
    const statusCode = paginationData.code ?? 1;

    this.logService.getByCode(statusCode, event.page!, this.pageSize).subscribe({
      next: (res: LogsDataResponse) => {
        this.logService.setLogData(res.content!);
      }
    })
  }
}
