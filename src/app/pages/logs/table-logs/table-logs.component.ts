import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';

import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TableSelectComponent } from './table-select/table-select.component';
import { LogsDataResponse, LogsInterface } from '@interfaces/logs.interface';
import { ToastService } from '@services/toast.service';
import { LogsService } from '@services/logs.service';

@Component({
  selector: 'table-logs',
  imports: [TableModule, MatIconModule, TableSelectComponent, DatePipe],
  templateUrl: './table-logs.component.html',
})
export class TableLogsComponent {
  logsService = inject(LogsService);
  toast = inject(ToastService);

  dataSource: LogsInterface[] = [];

  displayedColumns = ['Timestamp', 'Endpoint', 'Method', 'Status Code'];

  ngOnInit() {
    this.logsService.logsData$.subscribe(logs => {
      this.dataSource = logs;
    })

    this.fetchLogs();
  }

  fetchLogs() {
    this.logsService.getByCode().subscribe({
      next: (res: LogsDataResponse) => {
        if (res.content!.length === 0) {
          this.dataSource = [];
          return;
        }

        this.dataSource = (res.content ?? []).map((log: LogsInterface) => {
          const newEndpoint = log.endpoint.slice(4);

          return {
            ...log,
            statusCode: Number(log.statusCode),
            endpoint: newEndpoint,
            date: new Date(log.date),
          }
        })

        this.logsService.setLogData(this.dataSource);

        this.logsService.setPaginationData({
          page: res.page!,
          pageSize: res.pageSize!,
          total: res.total!
        });

        this.toast.success('Success', 'Logs obtained!');
      },
      error: (error) => {
        this.toast.error('Error', error.error.message ?? 'There was a problem with the server, try again later.');
        // console.error(error);
      }
    })
  }
}
