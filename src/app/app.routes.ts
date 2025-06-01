import { Routes } from '@angular/router';
import { EvenementListComponent } from './pages/admin/evenements/evenement-list/evenement-list.component';
import { LoginComponent } from './pages/admin/login/login/login.component';
import { EvenementDetailComponent } from './pages/admin/evenements/evenement-detail/evenement-detail.component';
import { NotFoundComponent } from './pages/admin/not-found/not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
import { EventResolver } from './resolvers/event.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

<<<<<<< HEAD
    { path: 'evenements', component: EvenementListComponent,  resolve: { evenementsPage: EventResolver } },
    // { path: 'evenement/:id', component: EvenementDetailComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'evenementDetail/:id', component: EvenementDetailComponent, canActivate: [AuthGuard] },

=======
    { path: 'evenements', component: EvenementListComponent, canActivate: [AuthGuard], resolve: { evenementsPage: EventResolver } },
    // { path: 'evenement/:id', component: EvenementDetailComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'evenementDetail/:id', component: EvenementDetailComponent, canActivate: [AuthGuard] },

=======
import { AdminGuard } from './guards/admin/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'evenements', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path: 'evenements', component: EvenementListComponent, }, //canActivate: [AuthGuard, AdminGuard] },
    // { path: 'evenementDetail', component: EvenementDetailComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'evenementDetail', component: EvenementDetailComponent },
// evenement/:id
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
    { path: '**', component: NotFoundComponent }
];

