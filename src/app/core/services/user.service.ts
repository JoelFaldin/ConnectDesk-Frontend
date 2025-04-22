import { BehaviorSubject, filter, map } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UpdateUser, User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  private usersSource = new BehaviorSubject<User[]>([]);
  users$ = this.usersSource.asObservable();

  // Methods to handle local users data:
  setUsers(users: User[]) {
    this.usersSource.next(users);
  }

  getSingleUser(rut: string) {
    return this.users$.pipe(
      filter(users => users.length > 0),
      map(users => users.find(user => user.rut === rut)),
    )
  }

  getUsers() {
    return this.usersSource.getValue();
  }

  updateUserArray(rut: string, updatedValues: Partial<User>) {
    const users = this.usersSource.getValue();
    const updatedUsers: User[] = users.map(user => {
      return user.rut === rut ? { ...user, ...updatedValues } : user;
    });

    this.setUsers(updatedUsers);
  }

  // Interact with backend:
  getUserData(searchValue: string = '', searchColumn: string = '', page: number = 1, pageSize: number = 10) {
    return this.http.get(`${this.apiUrl}/users?searchValue=${searchValue}&searchColumn=${searchColumn}&page=${page}&pageSize=${pageSize}`)
  }

  updateUser(rut: string, updatedValues: UpdateUser[]) {
    return this.http.patch(`${this.apiUrl}/users`, {
      rut,
      values: updatedValues,
    })
  }
}
