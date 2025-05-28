export interface User {
    id: number;
    nom: string;
    prenom: string;
    login: string;
    password: string;
    telephone: string;
    role: Role;
}

export type Role = "Admin"| "Etudiant" | "Vigile";

export enum RoleEnum {
    Admin = "Admin",
    Etudiant = "Etudiant",
    Vigile = "Vigile"
}

export interface Etudiant extends User{
    dateNaiss: Date;
    niveau: string;
    filiere: string;
    classe: string;
    matricule: string;
}

export interface Vigile extends User{
    
}

export interface Admin extends User{

}

export interface LoginResponse {
    message: string;
    success: boolean;
    data: User|null;
}
