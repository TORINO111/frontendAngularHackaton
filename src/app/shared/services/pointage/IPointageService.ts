import { Observable } from 'rxjs';
import { Pointage } from '../../../shared/models/pointage.model';

export interface IPointageService {
    pointer(etudiantId: number, sessionId: number, vigileId: number): Observable<Pointage>;

    getPointagesByEtudiant(etudiantId: number): Observable<Pointage[]>;

    getPointagesBySession(sessionId: number): Observable<Pointage[]>;
}
