import {LoginResponse, Role, User} from '../../models/user.model';
import {Observable} from 'rxjs';

export interface IAuthService {
  login(username: string, password: string): Observable<LoginResponse>;

  logout(): void;

  isAuthenticated(): boolean;

  isAdmin(): boolean;

  getCurrentUser(): User | null;

}
