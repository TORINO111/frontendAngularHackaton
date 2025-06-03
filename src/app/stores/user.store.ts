import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
    private _user = signal<User | null>(null);

    readonly userFullName = computed(() => {
        const u = this._user();
        return u ? `${u.prenom} ${u.nom}` : '';
    });

    readonly user$ = toObservable(this._user);

    readonly user = this._user.asReadonly();

    constructor(private http: HttpClient) {}


    setUser(user: User | null) {
        this._user.set(user);
    }

    logout() {
        this._user.set(null);
    }
}