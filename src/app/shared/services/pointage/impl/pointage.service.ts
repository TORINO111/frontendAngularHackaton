import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../../../models/pointage.model';
import { IPointageService } from '../IPointageService';

@Injectable({
  providedIn: 'root'
})
export class PointageService implements IPointageService{

  private API_URL = 'http://localhost:8080/api/pointages';

  constructor(private http: HttpClient) {}

  pointer(etudiantId: number, sessionId: number, vigileId: number): Observable<Pointage> {
    return this.http.post<Pointage>(`${this.API_URL}/pointer`, {
      etudiantId,
      sessionId,
      vigileId
    });
  }

  getPointagesByEtudiant(etudiantId: number): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.API_URL}/etudiant/${etudiantId}`);
  }

  getPointagesBySession(sessionId: number): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.API_URL}/session/${sessionId}`);
  }

}
