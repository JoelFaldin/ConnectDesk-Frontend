import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  // Interact with backend:
  uploadExcelFile(formData: FormData) {
    return this.http.post(`${this.apiUrl}/excel/upload`, formData)
  }

  downloadTemplate() {
    return this.http.get(`${this.apiUrl}/excel/template`, {
      responseType: 'blob',
    });
  }
}
