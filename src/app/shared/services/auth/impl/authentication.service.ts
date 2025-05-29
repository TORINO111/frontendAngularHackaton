import { Injectable, signal } from '@angular/core';
import { AuthResponse, LoginResponse, Role, RoleEnum, User, UserCredentials } from '../../../models/user.model';
import { BehaviorSubject, catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthService } from '../IAuthService';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
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

}
