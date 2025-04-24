import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { LogsInterface } from '@interfaces/logs.interface';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  private logs = new BehaviorSubject<LogsInterface[]>([]);
  logsData$ = this.logs.asObservable();

  // Methods to handle log data:
  setLogData(logData: LogsInterface[]) {
    this.logs.next(logData);
  }

  // Interact with backend:
  getLogs() {
    return this.http.get(`${this.apiUrl}/logs`);
  }

  getByCode(statusCode: number) {
    return this.http.get(`${this.apiUrl}/logs/${statusCode}`);
  }
}
