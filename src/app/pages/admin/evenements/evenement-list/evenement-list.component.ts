<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
import { Evenement, PageResponse } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { HeaderComponent } from "../../../../shared/components/layout/header/header.component";
import { HighlightDirective } from '../../../../directives/highlight.directive';
import { AuthenticationService } from '../../../../shared/services/auth/impl/authentication.service';
import { EventResolver } from '../../../../resolvers/event.resolver';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HighlightDirective, HeaderComponent, RouterModule, CommonModule, FormsModule ],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less',
})
export class EvenementListComponent implements OnInit {
  pageResponse: PageResponse<Evenement> | undefined;
  evenements: Evenement[] = [];
  evenementsFiltres: Evenement[] = [];
=======
import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Evenement, PageResponse } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-evenement-list',
  imports: [CommonModule],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less'
})
export class EvenementListComponent {
  pageResponse: PageResponse<Evenement> | undefined;
  evenements: Evenement[] = [];
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';
<<<<<<< HEAD
  selectedType: string = '';
  selectedEtat: string = '';

  constructor(
    private evenementService: EvenementService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['evenementsPage'];
    this.loadPageFromResponse(resolvedData);
    this.evenementsFiltres = [...this.evenements];
  }

  applyFilter(): void {
    console.log('Type sélectionné:', this.selectedType);
    if (!this.selectedType) {
      this.evenementsFiltres = [...this.evenements];
      console.log('Filtres', this.evenementsFiltres);
    } else {
      this.evenementsFiltres = this.evenements.filter(
        evenement => evenement.type?.toLowerCase() === this.selectedType.toLowerCase()
      );
    }
  }

  getEvenementsByEtat(etat: string): Observable<PageResponse<Evenement>> {
    return this.evenementService.getEvenementsByEtat(etat).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements par état :', error);
        return throwError(() => new Error('Impossible de charger les événements par état.'));
      })
    );
  }

  filtrerParEtat(): void {
    if (this.selectedEtat) {
      this.getEvenementsByEtat(this.selectedEtat).subscribe({
        next: (response) => {
          this.evenementsFiltres = response.data;
          this.totalItems = response.totalItems; // Mettre à jour le nombre total si nécessaire
          this.totalPages = response.totalPages;   // Mettre à jour le nombre total de pages
          this.currentPage = response.currentPage; // Réinitialiser la page actuelle
          if (this.selectedEtat.toLowerCase() === 'justifie' && this.selectedType?.toLowerCase() === 'retard') {
            this.selectedType = '';
            this.filtrerParType();
          } else if (this.selectedEtat.toLowerCase() === 'non_justifie' && this.selectedType?.toLowerCase() === 'absence') {
            this.selectedType = '';
            this.filtrerParType();
          }
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par état:', error);
          this.evenementsFiltres = [];
        }
      });
    } else {
      this.evenementsFiltres = [...this.evenements];
      this.loadPage(0);
    }
  }

  getEvenementsParType(type: string): Observable<PageResponse<Evenement>> {
    return this.evenementService.getEvenementsByType(type).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des événements par type :', error);
        return throwError(() => new Error('Impossible de charger les événements par type.'));
      })
    );
  }

  filtrerParType(): void {
    if (this.selectedType) {
      this.getEvenementsParType(this.selectedType).subscribe({
        next: (response) => {
          this.evenementsFiltres = response.data;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par type:', error);
          this.evenementsFiltres = []; // Afficher une liste vide en cas d'erreur
        }
      });
    } else {
      this.evenementsFiltres = [...this.evenements]; // Afficher tous les événements si aucun type n'est sélectionné
      this.loadPage(0); // Recharger la première page de tous les événements
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPage(page);
    }
  }

  loadPage(page: number): void {
  this.evenementService.getEvenements(page).subscribe(response => {
    this.loadPageFromResponse(response);
  });
}

  private loadPageFromResponse(response: PageResponse<Evenement>): void {
    this.evenements = response.data;
    this.totalItems = response.totalItems;
    this.currentPage = response.currentPage;
    this.totalPages = response.totalPages;
    this.message = response.message;
    this.applyFilter();
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

=======

  constructor(private evenementService: EvenementService) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe(
      (response) => {
        this.pageResponse = response;
        this.evenements = response.data;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
        this.message = response.message;
        console.log('Données des événements:', this.evenements);
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
        // Gérez l'erreur ici (affichage d'un message à l'utilisateur, etc.)
      }
    );
  }
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
}
