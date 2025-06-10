import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EvenementService } from '../shared/services/evenements/impl/evenement.service';
import { PageResponse, Evenement } from '../shared/models/evenement.model';

@Injectable({
    providedIn: 'root',
})
export class EventResolver implements Resolve<PageResponse<Evenement>> {

    constructor(private evenementService: EvenementService) {}

    resolve(): Observable<PageResponse<Evenement>> {
        return this.evenementService.getEvenements(0).pipe(
        catchError(() => {
            return of({
            data: [],
            totalItems: 0,
            currentPage: 0,
            totalPages: 0,
            message: 'Erreur de chargement des événements'
            });
        })
        );
    }
}
