import { BehaviorSubject, filter, map } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  private usersSource = new BehaviorSubject<User[]>([]);
  users$ = this.usersSource.asObservable();

  // Methods to store user data:
  setUsers(users: User[]) {
    this.usersSource.next(users);
  }

  getSingleUser(rut: string) {
    return this.users$.pipe(
      filter(users => users.length > 0),
      map(users => users.find(user => user.rut === rut)),
    )
  }

  // Get user data:
  getUserData(searchValue: string = '', searchColumn: string = '', page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.apiUrl}/users?searchValue=${searchValue}&searchColumn=${searchColumn}&page=${page}&pageSize=${pageSize}`)
  }
}
