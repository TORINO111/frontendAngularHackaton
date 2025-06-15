import { Observable } from 'rxjs';
import { Evenement, PageResponse } from '../../models/evenement.model';

export interface IEvenementService {
    
    getEvenements(page: number, size: number): Observable<PageResponse<Evenement>>;

    getEvenementsFiltre(etat: string, type: string, matricule: string, page: number, size: number): Observable<PageResponse<Evenement>>;

    getEvenementsByEtat(etat: string, page: number): Observable<PageResponse<Evenement>>;

    getEvenementsByType(type: string, page: number): Observable<PageResponse<Evenement>>;
    
    validerAbsence(absenceId: string | number): Observable<void>;

    rejeterAbsence(eventId: string | number): Observable<void>;
}