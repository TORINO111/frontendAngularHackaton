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
    cours: Cours;
    date: string,
    type: Type
}