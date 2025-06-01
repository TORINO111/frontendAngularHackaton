<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/impl/authentication.service';
import { Router } from '@angular/router';
=======
<<<<<<< HEAD
import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/impl/authentication.service';
import { Router } from '@angular/router';
=======
import { Component } from '@angular/core';
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
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
<<<<<<< HEAD
=======
=======
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c

}
