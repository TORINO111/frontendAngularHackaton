import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
import { Evenement, PageResponse } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';

@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, FormsModule],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less',
})
export class EvenementListComponent implements OnInit, OnDestroy {
  pageResponse: PageResponse<Evenement> | undefined;
  evenements: Evenement[] = [];
  evenementsFiltres: Evenement[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';
  isLoading: boolean = false;

  // --- Filtres ---
  selectedType: string = '';
  selectedEtat: string = '';
  matriculeFilter: string = '';

  private filterSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private evenementService: EvenementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['evenementsPage'];
    this.loadPageFromResponse(resolvedData);

    this.filterSubject.pipe(
      debounceTime(400),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.filtrerEvenements();
    });
  }

  onFilterChange(): void {
    this.filterSubject.next();
  }

  filtrerEvenements(page: number = 0): void {
    // Si l'utilisateur a commencé à taper un matricule mais ne l'a pas terminé, on ne fait rien.
    if (this.matriculeFilter.length > 0 && this.matriculeFilter.length < 10) {
      return; // On sort de la fonction et on attend la suite de la saisie.
    }

    // Le code suivant ne s'exécute que si le matricule est vide ou complet (10 caractères).
    this.isLoading = true;
    this.currentPage = page;

    this.evenementService.getEvenementsFiltre(this.selectedEtat, this.selectedType, this.matriculeFilter, page).subscribe({
      next: (response) => {
        this.loadPageFromResponse(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du filtrage :', error);
        this.isLoading = false;
        this.message = 'Erreur lors du filtrage';
        this.evenementsFiltres = [];
        this.totalItems = 0;
        this.totalPages = 0;
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.filtrerEvenements(page);
    }
  }

  goToDetail(id: string | number): void {
    this.isLoading = true;
    this.router.navigate(['/evenementDetail', id]);
  }

  private loadPageFromResponse(response: PageResponse<Evenement>): void {
    this.pageResponse = response;
    this.evenements = response.data;
    this.evenementsFiltres = [...this.evenements];
    this.totalItems = response.totalItems;
    this.currentPage = response.currentPage;
    this.totalPages = response.totalPages;
    this.message = response.message;
  }

  getPages(): number[] {
    const maxPagesToShow = 5;
    const allPages = Array.from({ length: this.totalPages }, (_, i) => i);
    
    if (this.totalPages <= maxPagesToShow) {
        return allPages;
    }

    let startPage = Math.max(0, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage >= this.totalPages) {
        endPage = this.totalPages - 1;
        startPage = endPage - maxPagesToShow + 1;
    }

    return allPages.slice(startPage, endPage + 1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}