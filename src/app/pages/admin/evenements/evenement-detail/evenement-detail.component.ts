import { Component, OnInit } from '@angular/core';
// MODIFIÉ : Ajout de 'Router'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
import { Evenement } from '../../../../shared/models/evenement.model';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evenement-detail',
  // NOUVEAU : Ajout de standalone: true pour que 'imports' soit valide
  standalone: true, 
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.less'],
  imports: [RouterModule, SidebarComponent, CommonModule ]
})
export class EvenementDetailComponent implements OnInit {
  evenementId: string | null = null;
  evenement: Evenement | undefined;
  errorMessage: string = '';

  // NOUVEAU : Variables d'état pour le chargement et la modale
  isLoading: boolean = true; // Démarre en chargement
  isImageModalOpen: boolean = false;
  modalImageUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    // NOUVEAU : Injection du Router
    private router: Router
  ) { }

  ngOnInit(): void {
    this.evenementId = this.route.snapshot.paramMap.get('id');
    if (this.evenementId) {
      this.loadEvenementDetails(this.evenementId);
    } else {
      this.errorMessage = 'ID de l\'événement non trouvé dans l\'URL.';
      this.isLoading = false; // Arrête le chargement si pas d'ID
    }
  }

  loadEvenementDetails(id: string): void {
    this.isLoading = true; // Active le chargement avant l'appel API
    this.evenementService.getEvenementById(id).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.evenement = response.data;
        } else {
          this.errorMessage = 'Détails de l\'événement non trouvés.';
        }
        this.isLoading = false; // Arrête le chargement après avoir reçu les données
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des détails de l\'événement:', error);
        this.errorMessage = 'Erreur lors du chargement des détails de l\'événement.';
        this.isLoading = false; // Arrête aussi en cas d'erreur
      }
    });
  }

  // NOUVEAU : Méthode pour retourner à la liste en affichant le chargement
  goBackToList(): void {
    this.isLoading = true;
    this.router.navigate(['/evenements']);
  }

  // NOUVEAU : Méthode pour ouvrir la modale d'image
  openImageModal(imageUrl: string): void {
    if (!imageUrl) return;
    this.modalImageUrl = imageUrl;
    this.isImageModalOpen = true;
  }

  // NOUVEAU : Méthode pour fermer la modale d'image
  closeImageModal(): void {
    this.isImageModalOpen = false;
    // Laisse le temps à l'animation de sortie de se terminer avant de vider l'URL
    setTimeout(() => {
        this.modalImageUrl = null;
    }, 300);
  }

  validerAbsence(id: string | undefined): void {
    if (id) {
      this.isLoading = true; // MODIFIÉ : Active le chargement
      this.evenementService.validerAbsence(id).subscribe({
        next: (response) => {
          console.log('Absence validée:', response);
          this.loadEvenementDetails(id); // Recharge les détails, ce qui gère isLoading
        },
        error: (error) => {
          console.error('Erreur lors de la validation de l\'absence:', error);
          this.isLoading = false; // MODIFIÉ : Gère le chargement en cas d'erreur
        }
      });
    }
  }

  refuserAbsence(id: string | undefined): void {
    if (id) {
      this.isLoading = true; // MODIFIÉ : Active le chargement
      this.evenementService.rejeterAbsence(id).subscribe({
        next: (response) => {
          console.log('Absence refusée:', response);
          this.loadEvenementDetails(id); // Recharge les détails
        },
        error: (error) => {
          console.error('Erreur lors du refus de l\'absence:', error);
          this.isLoading = false; // MODIFIÉ : Gère le chargement en cas d'erreur
        }
      });
    }
  }
}