import { Injectable } from '@angular/core';
import { IEvenementService } from '../IEvenementService';
import { Observable } from 'rxjs';
import { Evenement } from '../../../models/evenement.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvenementService implements IEvenementService {

  private API_URL = 'http://localhost:8080/api/absences';
  http: any;

  constructor(private httpClient: HttpClient) { }

  getEvenementByEtudiantID(etudiantId: number): Observable<Evenement> {
    return this.httpClient.get<Evenement>(`API_URL/${etudiantId}`);
  }
  
  validerJustification(id: number): Observable<void> {
    return this.httpClient.put<void>(`${this.API_URL}/${id}/valider`, {});
  }
  getEvenements(): Observable<Evenement[]> {
    return this.httpClient.get<Evenement[]>(`API_URL`);
  }
  getEvenementByID(evenementId: number): Observable<Evenement> {
    return this.httpClient.get<Evenement>(`API_URL/${evenementId}`);
  }
  getEvenementByEtat(etat: string): Observable<Evenement> {
    return this.httpClient.get<Evenement>(`API_URL/${etat}`);
  }
  getEvenementByType(etat: string): Observable<Evenement> {
    throw new Error('Method not implemented.');
  }

}
