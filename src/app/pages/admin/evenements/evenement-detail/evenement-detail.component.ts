import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/layout/sidebar/sidebar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { Evenement } from '../../../../shared/models/evenement.model';

@Component({
  selector: 'app-evenement-detail',
  imports: [SidebarComponent, RouterModule],
  templateUrl: './evenement-detail.component.html',
  styleUrl: './evenement-detail.component.less'
})
export class EvenementDetailComponent implements OnInit{

  evenementId: string | null = null;
  evenement:Evenement | undefined;
  errorMessage: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) { }

  
  ngOnInit(): void {
    this.evenementId = this.route.snapshot.paramMap.get('id');
    if (this.evenementId) {
      this.loadEvenementDetails(this.evenementId);
      console.log(this.evenement, 'Récupéré avec succès')

    } else {
      this.errorMessage = 'ID de l\'événement non trouvé dans l\'URL.';
    }
  }

  loadEvenementDetails(id: string): void {
    this.evenementService.getEvenementById(id).subscribe({
      next: (data) => {
        this.evenement = data;
        console.log(this.evenement, 'Récupéré avec succès')
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement:', error);
        this.errorMessage = 'Erreur lors du chargement des détails de l\'événement.';
      }
    });
  }
}
