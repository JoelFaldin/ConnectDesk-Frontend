import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  // Interact with backend:
  getLogs() {
    return this.http.get(`${this.apiUrl}/logs`);
  }
}
