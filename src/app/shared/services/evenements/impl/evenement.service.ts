import { HttpClient, HttpParams } from '@angular/common/http';
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
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getEvenements(page?: number, size?: number): Observable<PageResponse<Evenement>> {
    let params = new HttpParams();
    if (page !== undefined) params = params.set('page', page);
    if (size !== undefined) params = params.set('size', size);

    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences`,
      { params }
    );
  }

  getEvenementById(id: string): Observable<Evenement> {
    return this.httpClient.get<Evenement>(`${this.apiUrl}/absences/${id}`);
  }

  getEvenementsByEtudiantID(etudiantId: string | number): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${this.apiUrl}/absences/etudiant/${etudiantId}`);
  }
  
  validerJustification(absenceId: string | number ): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/absences/valider/${absenceId}`, {});
  }

  getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${this.apiUrl}/absences/${etat}`);
  }

  getEvenementsByType(type: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(`${this.apiUrl}/absences/${type}`);
  }

  rejeterJustification(absenceId: string | number): Observable<any> {
    return this.httpClient.put<void>(`${this.apiUrl}/absences/rejeter/${absenceId}`, {});
  }

}