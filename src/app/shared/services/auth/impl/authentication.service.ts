import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment.prod';
import { User } from '../../../models/user.model';

export interface Token {
  value: string;

}

interface AuthResponse {
  token: Token;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  login(login: string, password: string): Observable<AuthResponse> {
    const credentials = { login: login, password: password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.saveToken(response.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const storedToken = localStorage.getItem(this.tokenKey);
    return storedToken;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  saveToken(token: Token): void {
    localStorage.setItem(this.tokenKey, token.value); // Utilisez token.value (ou le nom de votre propriété)
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return of(null as unknown as User);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(`${this.apiUrl}/me`, { headers });
  }
}