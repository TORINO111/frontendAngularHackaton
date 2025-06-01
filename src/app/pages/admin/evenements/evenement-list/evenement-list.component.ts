import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
import { Evenement, PageResponse } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/evenement.service';
import { HeaderComponent } from "../../../../shared/components/layout/header/header.component";
import { HighlightDirective } from '../../../../directives/highlight.directive';
import { AuthenticationService } from '../../../../shared/services/auth/impl/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HighlightDirective, HeaderComponent],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less',
})
export class EvenementListComponent implements OnInit {
  evenements: Evenement[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';

  filtreEtat: string = '';
  filtreDateDebut: string = '';
  filtreDateFin: string = '';
  filtreEtudiantId: string = '';
  taille: number = 10;

  constructor(
    private evenementService: EvenementService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filtrer();
  }

  filtrer(): void {
    if (this.filtreEtudiantId && this.filtreDateDebut && this.filtreDateFin) {
      this.evenementService.getEvenementsByPeriode(
        this.filtreEtudiantId, this.filtreDateDebut, this.filtreDateFin
      ).subscribe(response => {
        this.evenements = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.message = response.message ?? '';
      });
    } else {
      this.evenementService.getEvenements(this.currentPage, this.taille).subscribe(response => {
        this.evenements = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.message = response.message ?? '';
      });
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.filtrer();
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
