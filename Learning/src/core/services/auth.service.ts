import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { BehaviorSubject, Observable, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loggedInKey = 'loggedInUser';
  private loggedIn$ = new BehaviorSubject<UserModel | null>(null);
  public readonly users: Array<UserModel> = [];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {
    const loggedInUser = localStorage.getItem(this.loggedInKey);
    if (loggedInUser) {
      const user: UserModel = JSON.parse(loggedInUser);
      this.loggedIn$.next(user);
    }
  }

  public get(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>('api/users');
  }

  public login(
    login: string,
    password: string
  ): Observable<UserModel | undefined> {
    return this.get().pipe(
      map((users) => {
        const user = users.find(
          (item) => item.login === login && item.password === password
        );
        if (user) {
          this.loggedIn$.next(user);
          localStorage.setItem(this.loggedInKey, JSON.stringify(user));
        }
        
        this.router.navigate(['/home']);
        return user;
      })
    );
  }

  public logout(): void {
    this.loggedIn$.next(null);
    localStorage.removeItem(this.loggedInKey);
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable().pipe(
      map((user) => !!user),
      tap((item) => {
        if (!item) {
          this.router.navigate(['/unavailable']);
        }
      })
    );
  }

  public getUser(): Observable<UserModel | null> {
    return this.loggedIn$.asObservable();
  }
}
