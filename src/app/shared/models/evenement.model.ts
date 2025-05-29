import { Session } from "./session.model";
export type TypeEvenementApi = 'ABSENCE' | 'RETARD';
export type StatutJustificationApp = 'EN_ATTENTE' | 'VALIDEE' | 'REJETEE' | 'NON_JUSTIFIEE';
export type StatutJustificationFiltre = StatutJustificationApp | 'TOUS';

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
    statut: StatutJustificationApp;
    commentaireAdmin?: string;
}

export interface EvenementAdminView {
    id: string | number;
    type: TypeEvenementApi;
    date: string;
    heureDebut: string;
    heureFin: string;
    etudiant: EtudiantInfo;
    session: Session;
    justification?: JustificationDetails;
}

export interface LookupItem {
    id: string | number;
    libelle: string;
}

// MODIFICATION: Ajout des filtres de pagination et de statut
export interface EvenementFiltres {
    searchTerm?: string;
    statut?: StatutJustificationFiltre; // Filtre par statut
    page?: number;                      // Pour la pagination
    limit?: number;                     // Nombre d'éléments par page
}

// AJOUT: Interface pour la réponse paginée du backend
export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}