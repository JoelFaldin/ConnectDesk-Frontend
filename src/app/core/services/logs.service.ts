import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { PaginationInterface } from '@interfaces/pagination.interface';
import { LogsInterface } from '@interfaces/logs.interface';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  private logs = new BehaviorSubject<LogsInterface[]>([]);
  logsData$ = this.logs.asObservable();

  private page = new BehaviorSubject<Partial<PaginationInterface>>({});
  pagination$ = this.page.asObservable();

  // Methods to handle pagination:
  setPaginationData(pageData: Partial<PaginationInterface>) {
    this.page.next({
      ...this.page.getValue(),
      ...pageData,
    })
  }

  // Methods to handle log data:
  setLogData(logData: LogsInterface[]) {
    this.logs.next(logData);
  }

  // Interact with backend:
  getLogs(page: number = 0, pageSize: number = 10) {
    return this.http.get(`${this.apiUrl}/logs?page=${page}&pageSize=${pageSize}`);
  }

  getByCode(statusCode: number) {
    return this.http.get(`${this.apiUrl}/logs/${statusCode}`);
  }
}
