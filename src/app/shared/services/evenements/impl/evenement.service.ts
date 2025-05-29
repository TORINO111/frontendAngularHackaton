import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvenementAdminView, EvenementFiltres, PaginatedResponse, StatutJustificationApp } from '../../../models/evenement.model';
import { IEvenementService } from '../IEvenementService';
import { MOCK_EVENEMENTS } from '../../../mock/mock-data';
import { environment } from '../../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EvenementService implements IEvenementService {

  private http = Inject(HttpClient);

  constructor(private httpClient: HttpClient) { }

  getEvenements(filtres?: EvenementFiltres): Observable<PaginatedResponse<EvenementAdminView>> {
    return this.httpClient.get<PaginatedResponse<EvenementAdminView>>(`${environment.apiUrl}/absences`);
  }

  getEvenementsByEtudiantID(etudiantId: string | number): Observable<PaginatedResponse<EvenementAdminView>> {
    return this.httpClient.get<PaginatedResponse<EvenementAdminView>>(`${environment.apiUrl}/absences/etudiant/${etudiantId}`);
  }
  
  validerJustification(absenceId: string | number ): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/absences/valider/${absenceId}`, {});
  }

  getEvenementsByEtat(etat: string): Observable<PaginatedResponse<EvenementAdminView>> {
    return this.httpClient.get<PaginatedResponse<EvenementAdminView>>(`${environment.apiUrl}/absences/${etat}`);
  }

  getEvenementsByType(type: string): Observable<PaginatedResponse<EvenementAdminView>> {
    return this.httpClient.get<PaginatedResponse<EvenementAdminView>>(`${environment.apiUrl}/absences/${type}`);
  }

  rejeterJustification(absenceId: string | number): Observable<any> {
    return this.httpClient.put<void>(`${environment.apiUrl}/absences/rejeter/${absenceId}`, {});
  }

}