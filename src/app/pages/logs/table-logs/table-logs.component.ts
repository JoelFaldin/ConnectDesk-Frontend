import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';

import { Component, inject } from '@angular/core';

import { LogsService } from '@services/logs.service';
import { LogsInterface } from '@interfaces/logs.interface';

@Component({
  selector: 'table-logs',
  imports: [TableModule, MatIconModule],
  templateUrl: './table-logs.component.html',
})
export class TableLogsComponent {
  logsService = inject(LogsService);
  dataSource: LogsInterface[] = [];

  displayedColumns = ['Timestamp', 'Endpoint', 'Method', 'Status Code'];

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    this.logsService.getLogs().subscribe({
      next: (res: any) => {
        if (res.length === 0) {
          this.dataSource = res ?? [];
          return;
        }

        this.dataSource = res.map((log: LogsInterface) => {
          const newEndpoint = log.endpoint.slice(4);
          const logDate = new Date(log.date);

          return {
            ...log,
            statusCode: Number(log.statusCode),
            endpoint: newEndpoint,
            date: `${logDate.getFullYear()}-${logDate.getMonth() + 1}-${logDate.getDate()} ${logDate.getHours()}:${logDate.getMinutes()}:${logDate.getSeconds()}`
          }
        })
      }
    })
  }
}
