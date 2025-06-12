import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
import { Evenement, PageResponse } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { HeaderComponent } from "../../../../shared/components/layout/header/header.component";
import { HighlightDirective } from '../../../../directives/highlight.directive';
import { EventResolver } from '../../../../resolvers/event.resolver';
// MODIFIÉ : Ajout de 'Router' pour la navigation programmatique
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, FormsModule],
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
  isLoading: boolean = false;

  constructor(
    private evenementService: EvenementService,
    private route: ActivatedRoute,
    private router: Router // NOUVEAU : Injection du Router pour la navigation
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['evenementsPage'];
    this.loadPageFromResponse(resolvedData);
  }

  // NOUVEAU : Méthode pour naviguer vers la page de détail en affichant le chargement
  goToDetail(id: string | number): void {
    this.isLoading = true; // Active l'indicateur de chargement
    this.router.navigate(['/evenementDetail', id]); // Navigue vers la page de détail
  }

  applyFilter(page: number = 0): void {
    this.isLoading = true;
    this.currentPage = page;
    
    if (!this.selectedType) {
      this.loadPage(page); // Gère déjà son loading
    } else {
      this.evenementService.getEvenementsByType(this.selectedType, page).subscribe({
        next: (response) => {
          this.loadPageFromResponse(response);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par type:', error);
          this.isLoading = false;
          this.message = 'Erreur lors du filtrage par type';
        }
      });
    }
  }

    filtrerParEtat(page: number = 0): void {
    this.isLoading = true; // Active le loading
    this.currentPage = page;
    
    if (this.selectedEtat) {
      this.evenementService.getEvenementsByEtat(this.selectedEtat, page).subscribe({
        next: (response) => {
          this.loadPageFromResponse(response);
          this.isLoading = false; // Désactive le loading
        },
        error: (error) => {
          console.error('Erreur lors du filtrage par état:', error);
          this.isLoading = false; // Désactive le loading même en cas d'erreur
          this.message = 'Erreur lors du filtrage par état';
        }
      });
    } else {
      this.loadPage(page); // Cette méthode gère déjà son loading
    }
  }

  filtrerParType(): void {
    this.applyFilter(0);
  }

  filtrerParEtatTrigger(): void {
    this.filtrerParEtat(0);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.isLoading = true;
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
    this.isLoading = true;
    this.evenementService.getEvenements(page).subscribe({
      next: (response) => {
        this.loadPageFromResponse(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur de chargement:', error);
        this.isLoading = false;
        this.message = 'Erreur lors du chargement des données';
      }
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