import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Evenement, PageResponse } from '../../models/evenement.model';
import { IEvenementService } from './IEvenementService';
import { environment } from '../../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EvenementService implements IEvenementService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getEvenements(page?: number, size?: number): Observable<PageResponse<Evenement>> {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size !== undefined) {
      params = params.set('size', size.toString());
    }

    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences`,
      { params }
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements :', error);
        return throwError(() => new Error('Impossible de charger les événements.'));
      })
    );
  }

  getEvenementsByEtudiantID(etudiantId: string | number): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/etudiant/${etudiantId}`
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements pour l’étudiant :', error);
        return throwError(() => new Error('Impossible de charger les données de l’étudiant.'));
      })
    );
  }

  getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/etat/${etat}`
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements par état :', error);
        return throwError(() => new Error('Impossible de charger les événements par état.'));
      })
    );
  }

  getEvenementsByType(type: string): Observable<PageResponse<Evenement>> {
    return this.httpClient.get<PageResponse<Evenement>>(
      `${this.apiUrl}/absences/type/${type}`
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements par type :', error);
        return throwError(() => new Error('Impossible de charger les événements par type.'));
      })
    );
  }

  validerJustification(absenceId: string | number): Observable<void> {
    return this.httpClient.put<void>(
      `${this.apiUrl}/absences/valider/${absenceId}`,
      {}
    ).pipe(
      catchError(error => {
        console.error('Erreur lors de la validation de la justification :', error);
        return throwError(() => new Error('Impossible de valider cette justification.'));
      })
    );
  }

  rejeterJustification(absenceId: string | number): Observable<void> {
    return this.httpClient.put<void>(
      `${this.apiUrl}/absences/rejeter/${absenceId}`,
      {}
    ).pipe(
      catchError(error => {
        console.error('Erreur lors du rejet de la justification :', error);
        return throwError(() => new Error('Impossible de rejeter cette justification.'));
      })
    );
  }

}
