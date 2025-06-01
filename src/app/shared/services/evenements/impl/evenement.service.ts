<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Evenement, OneEvenement, PageResponse } from '../../../models/evenement.model';
<<<<<<< HEAD
=======
=======
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement, PageResponse } from '../../../models/evenement.model';
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
import { IEvenementService } from '../IEvenementService';
import { environment } from '../../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EvenementService implements IEvenementService {

  private http = Inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

<<<<<<< HEAD
  getEvenements(page: number=0, size: number=10): Observable<PageResponse<Evenement>> {
=======
<<<<<<< HEAD
  getEvenements(page?: number, size?: number): Observable<PageResponse<Evenement>> {
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
    let params = new HttpParams();
    if (page !== undefined) params = params.set('page', page);
    if (size !== undefined) params = params.set('size', size);

    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences`,
      { params }
    );
  }

  getEvenementById(id: string): Observable<OneEvenement> {
    return this.httpClient.get<OneEvenement>(`${this.apiUrl}/absences/${id}`);
  }

  // getEvenementsByEtudiantID(etudiantId: string): Observable<PageResponse<Evenement>> {
  //   return this.httpClient.get<PageResponse<Evenement>>(`${this.apiUrl}/absences/etudiant/${etudiantId}`);
  // }
  
  validerAbsence(absenceId: string ): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/absences/${absenceId}/valider`, {});
  }

  rejeterAbsence(absenceId: string | number): Observable<any> {
    return this.httpClient.put<void>(`${this.apiUrl}/absences/${absenceId}/rejeter`, {});
  }

  // getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>> {
  //   return this.httpClient.get<PageResponse<Evenement>>(`${this.apiUrl}/absences/${etat}`);
  // }

<<<<<<< HEAD
  getEvenementsByEtat(etat: string, page: number = 0, size: number = 10): Observable<PageResponse<Evenement>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/etat/${etat}`,
      { params }
=======
  getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/etat/${etat}`
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements par état :', error);
        return throwError(() => new Error('Impossible de charger les événements par état.'));
      })
    );
  }

<<<<<<< HEAD
  getEvenementsByType(type: string, page: number = 0, size: number = 10): Observable<PageResponse<Evenement>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/type/${type}`,
      { params }
=======
  getEvenementsByType(type: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/type/${type}`
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements par type :', error);
        return throwError(() => new Error('Impossible de charger les événements par type.'));
      })
    );
  }
  // getEvenementsByType(type: string): Observable<PageResponse<Evenement>> {
  //   return this.httpClient.get<PageResponse<Evenement>>(`${this.apiUrl}/absences/${type}`);
  // }


<<<<<<< HEAD
=======
=======
getEvenements(): Observable<PageResponse<Evenement>> {
  return this.httpClient.get<PageResponse<Evenement>>(
    `${this.apiUrl}/absences`,
  );
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
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c

}