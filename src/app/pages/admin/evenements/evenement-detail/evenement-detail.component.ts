<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { Evenement } from '../../../../shared/models/evenement.model';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
=======
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.less'],
<<<<<<< HEAD
  imports: [RouterModule, SidebarComponent, CommonModule ]
=======
  imports: [RouterModule, SidebarComponent]
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
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
      this.loadEvenementDetails(this.evenementId!);
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

  validerAbsence(id: string | undefined): void {
    if (id) {
      this.evenementService.validerAbsence(id).subscribe({
        next: (response) => {
          console.log('Absence validée:', response);
          // Gérez la réponse de l'API après la validation (par exemple, afficher un message de succès, recharger les détails)
          this.loadEvenementDetails(id);
        },
        error: (error) => {
          console.error('Erreur lors de la validation de l\'absence:', error);
          // Gérez l'erreur (par exemple, afficher un message d'erreur)
        }
      });
    }
  }

  refuserAbsence(id: string | undefined): void {
    if (id) {
      this.evenementService.rejeterAbsence(id).subscribe({
        next: (response) => {
          console.log('Absence refusée:', response);
          // Gérez la réponse de l'API après le refus (par exemple, afficher un message de succès, recharger les détails)
          this.loadEvenementDetails(id); // Recharger les détails pour afficher l'état mis à jour
        },
        error: (error) => {
          console.error('Erreur lors du refus de l\'absence:', error);
          // Gérez l'erreur (par exemple, afficher un message d'erreur)
        }
      });
    }
  }
<<<<<<< HEAD
}
=======
}
=======
import { Component } from '@angular/core';

@Component({
  selector: 'app-evenement-detail',
  imports: [],
  templateUrl: './evenement-detail.component.html',
  styleUrl: './evenement-detail.component.less'
})
export class EvenementDetailComponent {

}
>>>>>>> 812747f151929131edf7b6af79828d6b040338b4
>>>>>>> 5b4d2f775654d271145af8053a65585b358aee4c
