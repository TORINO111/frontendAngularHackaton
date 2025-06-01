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
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';
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
  }

  applyFilter(page: number = 0): void {
    this.currentPage = page;
    if (!this.selectedType) {
      this.loadPage(page); // Si aucun type sélectionné, revenir au chargement paginé normal
    } else {
      this.evenementService.getEvenementsByType(this.selectedType, page).subscribe({
        next: (response) => {
          this.loadPageFromResponse(response);
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par type:', error);
          this.evenementsFiltres = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.message = 'Erreur lors du filtrage par type.';
        }
      });
    }
  }

  filtrerParEtat(page: number = 0): void {
    this.currentPage = page;
    if (this.selectedEtat) {
      this.evenementService.getEvenementsByEtat(this.selectedEtat, page).subscribe({
        next: (response) => {
          this.loadPageFromResponse(response);
          // Retirer les conditions spécifiques ici, la logique de filtrage doit être dans le backend
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par état:', error);
          this.evenementsFiltres = [];
          this.totalItems = 0;
          this.totalPages = 0;
          this.message = 'Erreur lors du filtrage par état.';
        }
      });
    } else {
      this.loadPage(page); // Si aucun état sélectionné, revenir au chargement paginé normal
    }
  }

  filtrerParType(): void {
    this.applyFilter(0); // Réinitialiser la page à 0 lors d'un nouveau filtre de type
  }

  filtrerParEtatTrigger(): void {
    this.filtrerParEtat(0); // Réinitialiser la page à 0 lors d'un nouveau filtre d'état
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      if (this.selectedType) {
        this.applyFilter(page);
      } else if (this.selectedEtat) {
        this.filtrerParEtat(page);
      } else {
        this.loadPage(page);
      }
    }
  }

  loadPage(page: number): void {
    this.evenementService.getEvenements(page).subscribe(response => {
      this.loadPageFromResponse(response);
    });
  }

  private loadPageFromResponse(response: PageResponse<Evenement>): void {
    this.pageResponse = response;
    this.evenements = response.data;
    this.evenementsFiltres = [...this.evenements]; // Mettre à jour la liste filtrée avec les données de la page
    this.totalItems = response.totalItems;
    this.currentPage = response.currentPage;
    this.totalPages = response.totalPages;
    this.message = response.message;
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}