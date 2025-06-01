import { Observable } from 'rxjs';
import { Evenement, PageResponse } from '../../models/evenement.model';

export interface IEvenementService {
  getEvenements(page?: number, size?: number): Observable<PageResponse<Evenement>>;
  getEvenementsByEtudiantID(etudiantId: string | number): Observable<PageResponse<Evenement>>;
  getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>>;
  getEvenementsByType(type: string): Observable<PageResponse<Evenement>>;
  validerJustification(absenceId: string | number): Observable<void>;
  rejeterJustification(absenceId: string | number): Observable<void>;
}
