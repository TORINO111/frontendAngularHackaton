import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/impl/authentication.service';
import { Router } from '@angular/router';
import { UserStore } from '../../../../stores/user.store';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true
})
export class SidebarComponent implements OnInit{
  fullName = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStore: UserStore
  ) {}


  ngOnInit(): void {
    this.fullName = this.userStore.userFullName();
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
