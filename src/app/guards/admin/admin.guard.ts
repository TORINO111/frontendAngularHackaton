// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/auth/impl/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
    
}
}
