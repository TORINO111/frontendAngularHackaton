import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from '../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
    private user = signal<User | null>(null);

    // Computed signal
    readonly userFullName = computed(() => {
        const u = this.user();
        return u ? `${u.prenom} ${u.nom}` : '';
    });

    // Convert signal to RxJS Observable if needed
    readonly user$ = toObservable(this.user);

    constructor(private http: HttpClient) {}

    loadUserById(id: string) {
        this.http.get<User>(`/api/users/${id}`).subscribe(user => {
        this.user.set(user);
        });
    }

    logout() {
        this.user.set(null);
    }
}
