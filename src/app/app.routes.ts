import { Routes } from '@angular/router';
import { EvenementListComponent } from './pages/admin/evenements/evenement-list/evenement-list.component';
import { LoginComponent } from './pages/admin/login/login/login.component';
import { EvenementDetailComponent } from './pages/admin/evenements/evenement-detail/evenement-detail.component';
import { NotFoundComponent } from './pages/admin/not-found/not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { EventResolver } from './resolvers/event.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path: 'evenements', component: EvenementListComponent,  resolve: { evenementsPage: EventResolver } },
    // { path: 'evenement/:id', component: EvenementDetailComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'evenementDetail/:id', component: EvenementDetailComponent, canActivate: [AuthGuard] },

    { path: '**', component: NotFoundComponent }
];

