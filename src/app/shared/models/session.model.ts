import { Cours } from "./cours.model";

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
    coursId: number;
}