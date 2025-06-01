import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { Evenement } from '../../../../shared/models/evenement.model';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.less'],
  imports: [RouterModule, SidebarComponent]
})
export class EvenementDetailComponent implements OnInit {
  evenementId: string | null = null;
  evenement: Evenement | undefined;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) { }

  ngOnInit(): void {
    this.evenementId = this.route.snapshot.paramMap.get('id');
    if (this.evenementId) {
      this.loadEvenementDetails(this.evenementId);
      console.log(this.evenement)
    } else {
      this.errorMessage = 'ID de l\'événement non trouvé dans l\'URL.';
    }
  }

  loadEvenementDetails(id: string): void {
    this.evenementService.getEvenementById(id).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.evenement = response.data;
          console.log(this.evenement, "event recovered")
        } else {
          this.errorMessage = 'Détails de l\'événement non trouvés.';
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement:', error);
        this.errorMessage = 'Erreur lors du chargement des détails de l\'événement.';
      }
    });
  }
}