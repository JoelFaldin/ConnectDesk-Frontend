import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { RegisterPayload, LoginPayload, LoginResponsePayload } from '@interfaces/auth-payload.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
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

  checkBackendConnection() {
    return this.http.get(`${this.apiUrl}/health`);
  }

  //Methods to save and retrieve user data from localStorage:
  setSession(res: LoginResponsePayload) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify({
      names: res.names,
      identifier: res.identifier,
      email: res.email,
      role: res.role,
    }));
  }

  loginAsGuest() {
    localStorage.setItem('guest', 'true');
    localStorage.setItem('user', JSON.stringify({
      names: 'Guest',
      identifier: 'guest',
      email: null,
    }))
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token') || !!localStorage.getItem('guest');
  }

  isGuest() {
    return localStorage.getItem('guest') ? true : false;
  }

  logout() {
    localStorage.clear();
  }
}
