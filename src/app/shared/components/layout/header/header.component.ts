import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/impl/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() prenom: string = '';
  @Input() nom: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}