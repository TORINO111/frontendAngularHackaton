import { Session } from "./session.model";
export type Type = 'ABSENCE' | 'RETARD';
export type Etat = 'JUSTIFIE' | 'NOJUSTIFIE';

<<<<<<< HEAD
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
=======
export interface EtudiantInfo {
    id: string | number;
    matricule: string;
    nom: string;
    prenom: string;
    photoUrl?: string;
    classe?: string;
    niveau?: string;
    filiere?: string;
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
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

<<<<<<< HEAD
export interface OneEvenement{
    data:Evenement,
    message: string
}

=======
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
export interface Evenement{
    id: string | number,
    type: string,
    etat: string,
    dateDebut: string,
    heureDebut: string,
    heureFin: string,
<<<<<<< HEAD
    justification?: string,
    etudiant: Etudiant,
=======
    etudiantId: number,
    justification: string,
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
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
<<<<<<< HEAD
    page?: number;
    limit?: number;
=======
    page?: number;                      // Pour la pagination
    limit?: number;                     // Nombre d'éléments par page
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
}