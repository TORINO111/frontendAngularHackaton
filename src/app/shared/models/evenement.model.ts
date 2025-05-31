import { Session } from "./session.model";
export type Type = 'ABSENCE' | 'RETARD';
export type Etat = 'JUSTIFIE' | 'NOJUSTIFIE';

export interface EtudiantInfo {
    id: string | number;
    matricule: string;
    nom: string;
    prenom: string;
    photoUrl?: string;
    classe?: string;
    niveau?: string;
    filiere?: string;
}

export interface CoursInfo {
    id: string | number;
    libelle: string;
}

export interface JustificationDetails {
    id: string | number;
    motifSoumis: string;
    pieceJointeUrl?: string;
    dateSoumission: string;
    commentaireAdmin?: string;
}

export interface Evenement{
    id: string | number,
    type: string,
    etat: string,
    dateDebut: string,
    heureDebut: string,
    heureFin: string,
    etudiantId: number,
    justification: string,
}

export interface PageResponse<T> {
    totalItems: number;
    data: T[];
    totalPages: number;
    message: string;
    currentPage: number;
}

export interface LookupItem {
    id: string | number;
    libelle: string;
}

// MODIFICATION: Ajout des filtres de pagination et de statut
export interface EvenementFiltres {
    searchTerm?: string;
    page?: number;                      // Pour la pagination
    limit?: number;                     // Nombre d'éléments par page
}