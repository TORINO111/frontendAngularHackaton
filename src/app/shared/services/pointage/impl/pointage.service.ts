import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../../../models/pointage.model';
import { IPointageService } from '../IPointageService';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PointageService implements IPointageService{

  constructor(private http: HttpClient) {}

  pointer(etudiantId: number, sessionId: number, vigileId: number): Observable<Pointage> {
    return this.http.post<Pointage>(`${environment.apiUrl}/pointage/pointer`, {
      etudiantId,
      sessionId,
      vigileId
    });
  }

  getPointagesByEtudiant(etudiantId: number): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${environment.apiUrl}/pointage/etudiant/${etudiantId}`);
  }

  getPointagesBySession(sessionId: number): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${environment.apiUrl}/pointage/session/${sessionId}`);
  }

}
