import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/layout/logo/logo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth/impl/authentication.service';
import { UserStore } from '../../../../stores/user.store';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
          tap(response => {
            this.authService.saveToken(response.token);
            const user$ = response.user
              ? of(response.user)
              : this.authService.getCurrentUser();

            user$.subscribe({
              next: (user) => {
                this.userStore.setUser(user);
                this.router.navigate(['/evenements']);
                this.messageSucces = 'Connexion réussie !';
              },
              error: (error) => {
                console.error('Erreur récupération utilisateur :', error);
                this.messageSucces = 'Connexion réussie, mais récupération utilisateur échouée.';
                this.router.navigate(['/evenements']);
              }
            });
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