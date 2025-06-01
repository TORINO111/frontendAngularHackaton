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

@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HighlightDirective, HeaderComponent],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less',
})
export class EvenementListComponent implements OnInit {
  pageResponse: PageResponse<Evenement> | undefined;
  evenements: Evenement[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';

  constructor(
    private evenementService: EvenementService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const resolvedData = this.route.snapshot.data['evenementsPage'];
    this.loadPageFromResponse(resolvedData);
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
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

}
