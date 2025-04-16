import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { RegisterPayload } from '@interfaces/register-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  register(data: RegisterPayload) {
    return firstValueFrom(this.http.post(`${this.apiUrl}/auth/register`, data));
  }

}
