import { Routes } from '@angular/router';
import { EvenementsComponent } from './pages/admin/evenements/evenements/evenements.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { EvenementDetailComponent } from './pages/admin/evenements/evenementDetail/evenement-detail/evenement-detail.component';
import { NotFoundComponent } from './pages/admin/notFound/not-found/not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    { path: 'login', component: LoginComponent },

    { path: 'evenements', component: EvenementsComponent, canActivate: [AuthGuard, AdminGuard] },

    { path: 'evenement/:id', component: EvenementDetailComponent , canActivate: [AuthGuard, AdminGuard] },

    //404
    { path: '**', component: NotFoundComponent }
];
