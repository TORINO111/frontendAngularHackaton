import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/impl/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
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
