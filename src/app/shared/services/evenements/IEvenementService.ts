import { Observable } from 'rxjs';
import { Evenement, EvenementFiltres, PageResponse } from '../../models/evenement.model';

export interface IEvenementService {
    
    getEvenements():Observable <PageResponse<Evenement>>;

    // getEvenementByID(evenementId: string | number): Observable<Evenement>;

    // getEvenementsByEtudiantID(etudiantId: number): Observable<PageResponse<Evenement>>;

    getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>>;

    getEvenementsByType(type: string): Observable<PageResponse<Evenement>>;
    
    validerAbsence(absenceId: string | number): Observable<void>;

    rejeterAbsence(eventId: string | number): Observable<void>;

}