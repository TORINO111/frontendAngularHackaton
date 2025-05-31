import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
import { Evenement, PageResponse } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { HeaderComponent } from "../../../../shared/components/layout/header/header.component";
import { HighlightDirective } from '../../../../directives/highlight.directive';

@Component({
  selector: 'app-evenement-list',
  imports: [CommonModule, SidebarComponent, HighlightDirective],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less'
})
export class EvenementListComponent {
  pageResponse: PageResponse<Evenement> | undefined;
  evenements: Evenement[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';

  constructor(private evenementService: EvenementService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  goToPage(page: number): void {
  if (page >= 0 && page < this.totalPages) {
    this.currentPage = page;
    this.loadPage(page);
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  loadPage(page: number): void {
  this.evenementService.getEvenements(page).subscribe(
    (response) => {
      this.pageResponse = response;
      this.evenements = response.data;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
      this.message = response.message;
    },
    (error) => {
      console.error('Erreur lors du chargement de la page:', error);
    });
  }


}
