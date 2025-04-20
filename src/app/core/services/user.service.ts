import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  // Get user data:
  getUserData(searchValue: string = '', searchColumn: string = '', page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.apiUrl}/users?searchValue=${searchValue}&searchColumn=${searchColumn}&page=${page}&pageSize=${pageSize}`)
  }
}
