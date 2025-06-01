import { Observable } from 'rxjs';
import { Evenement, EvenementFiltres, PageResponse } from '../../models/evenement.model';

export interface IEvenementService {
    
    getEvenements():Observable <PageResponse<Evenement>>;

    // getEvenementByID(evenementId: string | number): Observable<Evenement>;

<<<<<<< HEAD
    // getEvenementsByEtudiantID(etudiantId: number): Observable<PageResponse<Evenement>>;
=======
    getEvenementsByEtudiantID(etudiantId: number): Observable<PageResponse<Evenement>>;
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4

    getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>>;

    getEvenementsByType(type: string): Observable<PageResponse<Evenement>>;
    
<<<<<<< HEAD
    validerAbsence(absenceId: string | number): Observable<void>;

    rejeterAbsence(eventId: string | number): Observable<void>;
=======
    validerJustification(absenceId: string | number): Observable<void>;

    rejeterJustification(eventId: string | number): Observable<void>;
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4

}