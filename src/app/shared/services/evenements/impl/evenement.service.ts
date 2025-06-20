import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Evenement, OneEvenement, PageResponse } from '../../../models/evenement.model';
import { IEvenementService } from '../IEvenementService';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private http = Inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private nomEndpoints = "absences";
  
  constructor(private httpClient: HttpClient) { }

  getEvenements(page: number = 0, size: number = 4): Observable<PageResponse<Evenement>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/${this.nomEndpoints}`,
      { params }
    );
  }

  getEvenementById(id: string): Observable<OneEvenement> {
    return this.httpClient.get<OneEvenement>(`${this.apiUrl}/${this.nomEndpoints}/${id}`);
  }

  getEvenementsFiltre(etat: string = '', type: string = '', matricule: string = '', page: number = 0, size: number = 4): Observable<PageResponse<Evenement>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (etat) {
      params = params.set('etat', etat);
    }
    if (type) {
      params = params.set('type', type);
    }
    if (matricule) {
      params = params.set('matricule', matricule);
    }

    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/${this.nomEndpoints}/filtre/etat-type-matricule`, { params }
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements filtrés :', error);
        return throwError(() => new Error('Impossible de charger les événements filtrés.'));
      })
    );
  }
  
  validerAbsence(absenceId: string): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${this.nomEndpoints}/${absenceId}/valider`, {});
  }

  rejeterAbsence(absenceId: string | number): Observable<any> {
    return this.httpClient.put<void>(`${this.apiUrl}/${this.nomEndpoints}/${absenceId}/rejeter`, {});
  }


}
  // getEvenementsByEtat(etat: string, page: number = 0, size: number = 4): Observable<PageResponse<Evenement>> {
  //   let params = new HttpParams()
  //     .set('page', page)
  //     .set('size', size);
  //   return this.httpClient.get<PageResponse<Evenement>>(
  //     `${this.apiUrl}/${this.nomEndpoints}/etat/${etat}`,
  //     { params }
  //   ).pipe(
  //     catchError(error => {
  //       console.error('Erreur lors de la récupération des événements par état :', error);
  //       return throwError(() => new Error('Impossible de charger les événements par état.'));
  //     })
  //   );
  // }

  // getEvenementsByType(type: string, page: number = 0, size: number = 4): Observable<PageResponse<Evenement>> {
  //   let params = new HttpParams()
  //     .set('page', page)
  //     .set('size', size);
  //   return this.httpClient.get<PageResponse<Evenement>>(
  //     `${this.apiUrl}/${this.nomEndpoints}/type/${type}`,
  //     { params }
  //   ).pipe(
  //     catchError(error => {
  //       console.error('Erreur lors de la récupération des événements par type :', error);
  //       return throwError(() => new Error('Impossible de charger les événements par type.'));
  //     })
  //   );
  // }