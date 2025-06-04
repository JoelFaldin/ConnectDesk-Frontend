import { BehaviorSubject, filter, map } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PaginationInterface } from '@interfaces/pagination.interface';
import { environment } from '../../../environments/environment';
import { UpdateUser, User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private jwt = localStorage.getItem('token') ?? '';

  private usersSource = new BehaviorSubject<User[]>([]);
  users$ = this.usersSource.asObservable();

  private page = new BehaviorSubject<Partial<PaginationInterface>>({});
  pagination$ = this.page.asObservable();

  // Methods to handle pagination:
  setPaginationData(pageData: Partial<PaginationInterface>) {
    this.page.next({
      ...this.page.getValue(),
      ...pageData,
    })
  }

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

  removeUserFromArray(rut: string) {
    const users = this.usersSource.getValue();
    const updatedUsers: User[] = users.filter(user => {
      return user.rut !== rut;
    })

    this.setUsers(updatedUsers);
  }

  // Interact with backend:
  getUserData(searchValue: string = '', searchColumn: string = '', page: number = 1, pageSize: number = 5) {
    return this.http.get(`${this.apiUrl}/users?searchValue=${searchValue}&page=${page}&pageSize=${pageSize}`)
  }

  createUser(newUser: User) {
    return this.http.post(`${this.apiUrl}/users`, newUser, {
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    });
  }

  updateUser(rut: string, updatedValues: UpdateUser[]) {
    return this.http.patch(`${this.apiUrl}/users?originalRut=${rut}`, {
      values: updatedValues,
    }, {
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    })
  }

  deleteUser(rut: string) {
    return this.http.delete(`${this.apiUrl}/users/${rut}`, {
      headers: {
        Authorization: `Bearer ${this.jwt}`
      }
    });
  }

  getSummary() {
    return this.http.get(`${this.apiUrl}/users/summary`);
  }
}
