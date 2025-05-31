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
  messageSucces: string = '';
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthenticationService) {

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
          if (response.user) {
            console.log('Connexion réussie, redirection vers /evenements');
            this.messageSucces = 'Connexion réussie ! Redirection en cours...';
            this.router.navigate(['/evenements']);
          } else {
            this.messageSucces = response.message || 'Échec de la connexion.';
          }
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);
          this.messageSucces = 'Une erreur s\'est produite lors de la connexion.';
        }
      });
    } else {
      this.messageSucces = 'Veuillez remplir tous les champs.';
    }
  }

  get currentUser() {
    return this.authService.getCurrentUserSignal();
  }

  get userFullName() {
    return this.authService.getUserFullNameSignal();
  }
}