import { environments } from './../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) { }

  //Getter User
  get currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    //Devuelve un clon del objeto
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString())),
      )

  }

}
