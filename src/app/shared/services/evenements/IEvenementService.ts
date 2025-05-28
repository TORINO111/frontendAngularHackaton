import { Observable } from 'rxjs';
import { Evenement } from '../../models/evenement.model';

export interface IEvenementService {
    
    getEvenements():Observable <Evenement[]>;

    getEvenementByID(evenementId: number): Observable<Evenement>;

    getEvenementByEtudiantID(etudiantId: number): Observable<Evenement>;

    getEvenementByEtat(etat: string): Observable<Evenement>;

    getEvenementByType(type: string): Observable<Evenement>;
    
    validerJustification(id: number): Observable<void>;

}