import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthStore {
    private isLoggedIn = signal(false);
    private user = signal<{ id: number; name: string } | null>(null);

    readonly isLoggedIn$ = this.isLoggedIn.asReadonly();
    readonly user$ = this.user.asReadonly();

    login(user: { id: number; name: string }) {
        this.user.set(user);
        this.isLoggedIn.set(true);
    }

    logout() {
        this.user.set(null);
        this.isLoggedIn.set(false);
    }
}
