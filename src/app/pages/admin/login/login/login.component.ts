import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/auth/impl/authentication.service';
import { AuthStore } from '../../../../stores/auth.store';
import { LogoComponent } from '../../../../shared/components/layout/logo/logo.component';

@Component({
  selector: 'app-login',
  imports: [LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthenticationService,
    private authStore: AuthStore
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(res => {
      if (res.success && res.data) {
        this.authStore.login(res.data); // met à jour le store avec le user
        this.message = 'Connexion réussie';
      } else {
        this.message = 'Échec de connexion';
      }
    });
  }

}
