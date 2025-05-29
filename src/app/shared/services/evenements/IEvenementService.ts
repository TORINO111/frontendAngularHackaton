import { Observable } from 'rxjs';
import { EvenementAdminView, EvenementFiltres, PaginatedResponse } from '../../models/evenement.model';

export interface IEvenementService {
    
    getEvenements(filtres?: EvenementFiltres):Observable <PaginatedResponse<EvenementAdminView>>;

    // getEvenementByID(evenementId: string | number): Observable<EvenementAdminView>;

    getEvenementsByEtudiantID(etudiantId: number): Observable<PaginatedResponse<EvenementAdminView>>;

    getEvenementsByEtat(etat: string): Observable<PaginatedResponse<EvenementAdminView>>;

    getEvenementsByType(type: string): Observable<PaginatedResponse<EvenementAdminView>>;
    
    validerJustification(absenceId: string | number): Observable<void>;

    rejeterJustification(eventId: string | number): Observable<void>;

}