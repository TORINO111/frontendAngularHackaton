import { Injectable, signal } from '@angular/core';
import { LoginResponse, Role, User } from '../../../models/user.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthService } from '../IAuthService';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthService{

  private API_URL = 'http://localhost:8080/api/auth'

  currentUserSignal = signal<User|null>(null);

  constructor(private http: HttpClient) { }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSignal();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {
      username,
      password
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.currentUserSignal.set(response.data);
        }
      }),
      catchError(() => {
        return of({
          message: 'ERROR: Login failed',
          success: false,
          data: null
        });
      })
    );
  }

  logout(): void {
    this.currentUserSignal.set(null);
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.currentUserSignal()?.role === 'Admin';
  }

}
