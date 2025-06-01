<<<<<<< HEAD
import { Injectable, signal, inject } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { LoginResponse, User } from '../../../models/user.model';
import { IAuthService } from '../IAuthService';
import { Router } from '@angular/router';
import { UserStore } from '../../../../stores/user.store';
import { HttpClient } from '@angular/common/http';
=======
import { Injectable, signal } from '@angular/core';
import { AuthResponse, LoginResponse, Role, RoleEnum, User, UserCredentials } from '../../../models/user.model';
import { BehaviorSubject, catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthService } from '../IAuthService';
import { environment } from '../../../../../environments/environment.prod';
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class AuthenticationService implements IAuthService {

  constructor(private router: Router, private http: HttpClient, private userStore: UserStore) { }

  getCurrentUser(): User | null {
    return this.userStore.user();
  }

  getCurrentUserSignal() {
    return this.userStore.user;
  }

  getUserFullNameSignal() {
    return this.userStore.userFullName;
  }

  isAuthenticated(): boolean {
    return !!this.userStore.user();
  }

  logout(): void {
    this.userStore.logout();
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.userStore.user()?.role === 'Admin';
  }

  login(login: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/web/auth/login`, {
      login,
      password
    }).pipe(
      tap(response => {
        if (response.user) {
          this.userStore.setUser(response.user);
=======
export class AuthenticationService implements IAuthService{


  currentUserSignal = signal<User|null>(null);

  constructor(private http: HttpClient) { }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSignal();
  }

  logout(): void {
    this.currentUserSignal.set(null);
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.currentUserSignal()?.role === 'Admin';
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/authentification`, {
      username,
      password
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.currentUserSignal.set(response.data);
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
        }
      }),
      catchError(() => {
        return of({
          message: 'ERROR: Login failed',
          success: false,
<<<<<<< HEAD
          user: null
=======
          data: null
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
        });
      })
    );
  }
<<<<<<< HEAD
}
=======

}
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
