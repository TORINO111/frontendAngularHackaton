import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../shared/services/auth/impl/authentication.service';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../../shared/components/layout/logo/logo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports:[LogoComponent, ReactiveFormsModule, CommonModule]
})
export class LoginComponent {

  loginForm: FormGroup;
  authService = inject(AuthenticationService); // Injectez l'AuthenticationService
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;
      this.authService.login(login, password).subscribe({
        next: (response) => {
          if (response.success) {
            // La navigation vers /evenements est déjà gérée dans AuthService
          } else {
            this.errorMessage = response.message || 'Échec de la connexion.';
          }
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }

  // Vous pouvez accéder aux informations de l'utilisateur (en lecture seule) ici si nécessaire
  get currentUser() {
    return this.authService.getCurrentUserSignal();
  }

  get userFullName() {
    return this.authService.getUserFullNameSignal();
  }
}