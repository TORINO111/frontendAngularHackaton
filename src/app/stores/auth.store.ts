import { Injectable, signal } from '@angular/core';
import { User } from '../shared/models/user.model';
import { AuthenticationService } from '../shared/services/auth/impl/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
    private isLoggedIn = signal(false);
    private user = signal<User | null>(null);

    readonly isLoggedIn$ = this.isLoggedIn.asReadonly();
    readonly user$ = this.user.asReadonly();

    constructor(private authService: AuthenticationService) {}

    initFromService() {
        const user = this.authService.getCurrentUser();
        this.user.set(user);
        this.isLoggedIn.set(!!user);
    }

    login(user: User) {
        this.user.set(user);
        this.isLoggedIn.set(true);
    }

    logout() {
        this.user.set(null);
        this.isLoggedIn.set(false);
        this.authService.logout();
    }
    }
