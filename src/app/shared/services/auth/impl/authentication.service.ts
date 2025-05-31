import { Injectable, signal, inject } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { LoginResponse, User } from '../../../models/user.model';
import { IAuthService } from '../IAuthService';
import { Router } from '@angular/router';
import { UserStore } from '../../../../stores/user.store';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthService {

  private userStore = inject(UserStore);

  constructor(private router: Router, private http: HttpClient) { }

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
        if (response.success && response.user) {
          this.userStore.setUser(response.user);
          this.router.navigate(['/evenements']);
        }
      }),
      catchError(() => {
        return of({
          message: 'ERROR: Login failed',
          success: false,
          user: null
        });
      })
    );
  }
}