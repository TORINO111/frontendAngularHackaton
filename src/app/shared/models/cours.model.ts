import { Etudiant } from "./user.model";

export interface Cours {
    id: number;
    libelle: string;
}

export interface EtudiantCours {
    id: number;
    cours: Cours;
    etudiant: Etudiant;
}