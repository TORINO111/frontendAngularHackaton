import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/impl/authentication.service';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../stores/auth.store';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  @Input() prenom: string = '';
  @Input() nom: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private authStore: AuthStore
  ) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
