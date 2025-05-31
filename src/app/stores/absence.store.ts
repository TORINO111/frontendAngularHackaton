import { Injectable, signal } from '@angular/core';
import { Evenement } from '../shared/models/evenement.model';

@Injectable({ providedIn: 'root' })
export class EvenementStore {
    private Evenements = signal<Evenement[]>([]);

    readonly Evenements$ = this.Evenements.asReadonly();

    setEvenements(data: Evenement[]) {
        this.Evenements.set(data);
    }

    validateJustification(id: number) {
        this.Evenements.update(list =>
        list.map(a => a.id === id ? { ...a, justified: true } : a)
        );
    }
}
