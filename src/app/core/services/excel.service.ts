import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthService} from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private jwt = localStorage.getItem('token') ?? '';

  private authService = inject(AuthService);

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
        Authorization: `Bearer ${this.jwt}`,
        Accept: "*/*",
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
    return this.http.get(`${this.apiUrl}/excel/summary`, {
      headers: {
        "Authorization": `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
