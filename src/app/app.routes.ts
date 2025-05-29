import { Routes } from '@angular/router';
import { EvenementListComponent } from './pages/admin/evenements/evenement-list/evenement-list.component';
import { LoginComponent } from './pages/admin/login/login/login.component';
import { EvenementDetailComponent } from './pages/admin/evenements/evenement-detail/evenement-detail.component';
import { NotFoundComponent } from './pages/admin/not-found/not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'authentification', pathMatch: 'full' },
    { path: 'authentification', component: LoginComponent },

    { path: 'evenements', component: EvenementListComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'evenement/:id', component: EvenementDetailComponent, canActivate: [AuthGuard, AdminGuard] },

    { path: '**', component: NotFoundComponent }
];

