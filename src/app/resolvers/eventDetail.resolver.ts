import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EvenementService } from '../shared/services/evenements/impl/evenement.service';
import { Evenement, OneEvenement} from '../shared/models/evenement.model';

@Injectable({
    providedIn: 'root',
})
export class EventDetailResolver implements Resolve<Evenement> {

    constructor(
        private evenementService: EvenementService,
        private router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evenement> {
    const id = route.paramMap.get('id');

    if (!id) {
        console.error('ID de l\'événement non trouvé dans la route.');
        this.router.navigate(['/not-found']);
        return of({} as Evenement);
    }

    return this.evenementService.getEvenementById(id).pipe(
        map((response: OneEvenement) => {
        if (response.data) {
          return response.data; // Retourne l'objet Evenement extrait de la propriété 'data'
        } else {
            console.error('Données de l\'événement absentes dans la réponse.');
            this.router.navigate(['/not-found']);
            return {} as Evenement;
        }
        }),
        catchError((error) => {
        console.error('Erreur lors de la récupération de l\'événement avec l\'ID:', id, error);
        this.router.navigate(['/not-found']);
        return of({} as Evenement);
        })
    );
    }
}