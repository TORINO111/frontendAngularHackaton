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
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 0;
  message: string = '';

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
}
