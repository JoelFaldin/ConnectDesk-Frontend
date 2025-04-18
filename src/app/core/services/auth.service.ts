import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { RegisterPayload, LoginPayload, LoginResponsePayload } from '@interfaces/auth-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  // Methods to handle user auth:
  register(data: RegisterPayload) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);;
  }

  login(data: LoginPayload): Observable<LoginResponsePayload> {
    return this.http.post<LoginResponsePayload>(`${this.apiUrl}/auth`, data).pipe(
      tap(res => this.setSession(res)),
    );
  }

  //Methods to save and retrieve user data from localStorage:
  setSession(res: LoginResponsePayload) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify({
      names: res.names,
      identifier: res.identifier,
      email: res.email,
    }));
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  logout() {
    localStorage.clear();
  }
}
