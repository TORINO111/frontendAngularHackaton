import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement, PageResponse } from '../../../models/evenement.model';
import { IEvenementService } from '../IEvenementService';
import { environment } from '../../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EvenementService implements IEvenementService {

  private http = Inject(HttpClient);

  constructor(private httpClient: HttpClient) { }

  getEvenements(): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${environment.apiUrl}/absences/v1`);
  }

  getEvenementsByEtudiantID(etudiantId: string | number): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${environment.apiUrl}/absences/etudiant/${etudiantId}`);
  }
  
  validerJustification(absenceId: string | number ): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/absences/valider/${absenceId}`, {});
  }

  getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${environment.apiUrl}/absences/${etat}`);
  }

  getEvenementsByType(type: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${environment.apiUrl}/absences/${type}`);
  }

  rejeterJustification(absenceId: string | number): Observable<any> {
    return this.httpClient.put<void>(`${environment.apiUrl}/absences/rejeter/${absenceId}`, {});
  }

}