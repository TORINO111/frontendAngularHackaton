export type Role = "Admin"| "Etudiant" | "Vigile";

export interface User {
    id: string | number;
    nom: string;
    prenom: string;
    login: string;
    password: string;
    telephone?: string;
    role: Role;
}

export interface UserCredentials {
    login: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}


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
    user: User | null;
}
