export interface Evenement {
    id: number;
    date: Date;
    justification: string;
    etat: Etat;
    type: Type;
    session_id: number;
    etudiantId: number;
}

export enum Etat{
    Justifie = "Justifie",
    NonJustifie = "NonJustifie"
}

export enum Type{
    Absence = "Absence",
    Retard = "Retard"
}