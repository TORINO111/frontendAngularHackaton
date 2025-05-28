import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/impl/authentication.service';
@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.less'
})
export class NavComponent implements OnInit{
  
  constructor(public authService: AuthenticationService)
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  protected links: Link[] = [
    {
      path: '/absences', name: 'Absences', class: 'nav-link', ariaCurrent: 'page', isVisible: true
    },
    {
      path: '/retards', name: 'Retards', class: '', isVisible: true, ariaCurrent: 'page',
    },
    
    ];

    async onLogout() {
      this.authService.logout();
      this.router.navigateByUrl('.', {
      skipLocationChange: true,
    }).then(
        () => {
        this.router.navigate(['/catalogue']);
    });
    }
}


interface Link {
  name: string;
  path: string;
  class : string;
  subLinks?: Array<Link>;
  ariaCurrent?: string;
  isVisible: boolean;
}
