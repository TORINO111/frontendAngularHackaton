import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Evenement } from '../../../../shared/models/evenement.model';
import { SidebarComponent } from "../../../../shared/components/layout/sidebar/sidebar.component";

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.less'],
  imports: [RouterModule, SidebarComponent]
})
export class EvenementDetailComponent implements OnInit {
  evenement: Evenement | undefined;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.evenement = data['evenement'];
      console.log(this.evenement)
      if (!this.evenement) {
        this.errorMessage = 'Détails de l\'événement non trouvés.';
      }
    });
  }
}