import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';

import { Component, inject } from '@angular/core';

import { TableSelectComponent } from './table-select/table-select.component';
import { LogsDataResponse, LogsInterface } from '@interfaces/logs.interface';
import { LogsService } from '@services/logs.service';

@Component({
  selector: 'table-logs',
  imports: [TableModule, MatIconModule, TableSelectComponent],
  templateUrl: './table-logs.component.html',
})
export class TableLogsComponent {
  logsService = inject(LogsService);
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
          const logDate = new Date(log.date);

          const pad = (n: number) => n.toString().padStart(2, '0');

          return {
            ...log,
            statusCode: Number(log.statusCode),
            endpoint: newEndpoint,
            date: `${logDate.getFullYear()}-${pad(logDate.getMonth() + 1)}-${pad(logDate.getDate())} ${pad(logDate.getHours())}:${pad(logDate.getMinutes())}:${pad(logDate.getSeconds())}`
          }
        })

        this.logsService.setLogData(this.dataSource);

        this.logsService.setPaginationData({
          page: res.page!,
          pageSize: res.pageSize!,
          total: res.total!
        });
      }
    })
  }
}
