import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/layout/logo/logo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth/impl/authentication.service';
import { UserStore } from '../../../../stores/user.store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [LogoComponent, ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  messageSucces: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userStore: UserStore
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;

      this.authService.login(login, password)
        .pipe(
          tap((response) => {
            // Si la connexion réussit et que le backend renvoie l'utilisateur et le token
            if (response && response.user && response.token) {
              this.userStore.setUser(response.user); // Stockez l'utilisateur dans le store
              this.authService.saveToken(response.token); // Sauvegardez le token via AuthService
            }
            // Gestion du cas où seul le token est renvoyé (votre code précédent)
            else if (response && response.token) {
              this.authService.saveToken(response.token);
              this.authService.getCurrentUser().subscribe({
                next: (user) => {
                  this.userStore.setUser(user);
                },
                error: (error) => {
                  console.error('Erreur lors de la récupération des infos utilisateur', error);
                  this.messageSucces = 'Connexion réussie, mais erreur lors de la récupération des informations utilisateur.';
                  this.router.navigate(['/evenements']); // Redirigez même en cas d'erreur de récupération (à adapter)
                },
              });
            } else {
              console.log( 'Échec de la connexion : réponse inattendue du serveur.');
            }
          })
        )
        .subscribe({
          next: (response) => {
            this.messageSucces = 'Connexion réussie ! Redirection en cours...';
            this.router.navigate(['/evenements']);
          },
          error: (error) => {
            console.error('Erreur de connexion:', error);
            this.messageSucces = 'Échec de la connexion.';
          },
        });
    } else {
      this.messageSucces = 'Veuillez remplir tous les champs.';
    }
  }

}