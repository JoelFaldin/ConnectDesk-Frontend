import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { PaginationInterface } from '@interfaces/pagination.interface';
import { environment } from '../../../environments/environment';
import { LogsInterface } from '@interfaces/logs.interface';
import { AuthService } from "@services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  private authService = inject(AuthService);

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

  getPagination() {
    return this.page.getValue();
  }

  // Methods to handle log data:
  setLogData(logData: LogsInterface[]) {
    this.logs.next(logData);
  }

  // Interact with backend:
  getByCode(statusCode: number = 1, page: number = 0, pageSize: number = 10) {
    return this.http.get(`${this.apiUrl}/logs/${statusCode}?page=${page}&pageSize=${pageSize}`, {
      headers: {
        "Authorization": `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getSummary() {
    return this.http.get(`${this.apiUrl}/logs/summary`, {
      headers: {
        "Authorization": `Bearer ${this.authService.getToken()}`
      }
    });
  }

  getAllLogs() {
    return this.http.get(`${this.apiUrl}/logs/all`, {
      headers: {
        "Authorization": `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
