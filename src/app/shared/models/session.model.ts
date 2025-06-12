import { Cours } from "./cours.model";
import { Type } from "./evenement.model";

// export interface Session {
//     id: number;
//     heureDebut: string;
//     heureFin: string;
//     cours: Cours;
// }

export interface Session {
    id: number;
    heureDebut: string;
    heureFin: string;
    date: string,
    salle: Salle,
    cours: Cours,
    batiment: Batiment
}

export interface Salle{
    salle: string
}

export interface Batiment{
    batiment: string
}
