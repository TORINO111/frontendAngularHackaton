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
<<<<<<< HEAD
    user: User | null;
=======
<<<<<<< HEAD
    user: User | null;
=======
    success: boolean;
    data: User|null;
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
}
