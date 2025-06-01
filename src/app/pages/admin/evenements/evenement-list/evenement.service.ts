import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evenement {
  // Mets ici les propriétés attendues (exemple) :
  id: number;
  dateDebut: string;
  heureDebut: string;
  heureFin: string;
  etat: string;
  justification: boolean;
  etudiant?: {
    matricule: string;
    prenom: string;
    nom: string;
    classe?: {
      niveau: string;
      filiere: string;
    };
  };
  // ...ajoute d'autres si besoin
}

export interface PageResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'https://dev-back-end-sd0s.onrender.com/api/absences';

  constructor(private http: HttpClient) {}

  filtrerEvenements(
    etudiantId: string,
    dateDebut: string,
    dateFin: string,
    etat: string,
    page: number,
    taille: number
  ): Observable<PageResponse<Evenement>> {
    let params = new HttpParams()
      .set('etudiantId', etudiantId)
      .set('dateDebut', dateDebut)
      .set('dateFin', dateFin)
      .set('etat', etat)
      .set('page', page.toString())
      .set('taille', taille.toString());

    return this.http.get<PageResponse<Evenement>>(`${this.apiUrl}/filtre`, { params });
  }
}
