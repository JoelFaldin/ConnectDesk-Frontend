import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);
  private jwt = localStorage.getItem('token') ?? '';

  // Interact with backend:
  uploadExcelFile(formData: FormData) {
    return this.http.post(`${this.apiUrl}/excel/upload`, formData, {
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    })
  }

  downloadTemplate() {
    return this.http.get(`${this.apiUrl}/excel/template`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    });
  }

  downloadUserData() {
    return this.http.get(`${this.apiUrl}/excel/download`, {
      responseType: 'blob',
    })
  }

  downloadLogsData() {
    return this.http.get(`${this.apiUrl}/excel/download/logs`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    })
  }

  getSummary() {
    return this.http.get(`${this.apiUrl}/excel/summary`);
  }
}
