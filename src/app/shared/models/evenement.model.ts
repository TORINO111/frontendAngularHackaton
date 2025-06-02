import { Session } from "./session.model";
export type Type = 'ABSENCE' | 'RETARD';
export type Etat = 'JUSTIFIE' | 'NOJUSTIFIE';

export interface Classe{
    id: string;
    niveau: string;
    filiere: string
}

export interface Etudiant {
    id: string | number;
    nom: string;
    prenom: string;
    login: string;
    password?: string;
    niveau: string;
    filiere: string;
    telephone: string;
    classe: Classe;
    matricule: string;
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

export interface OneEvenement{
    data:Evenement,
    message: string
}

export interface Evenement{
    id: string | number,
    type: string,
    etat: string,
    dateDebut: string,
    heureDebut: string,
    heureFin: string,
    justification?: string,
    justificatifImage: string,
    etudiant: Etudiant,
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
    page?: number;
    limit?: number;
}