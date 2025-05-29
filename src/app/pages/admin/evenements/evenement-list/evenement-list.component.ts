import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { Evenement } from '../../../../shared/models/evenement.model';
import { EvenementService } from '../../../../shared/services/evenements/impl/evenement.service';
@Component({
  selector: 'app-evenement-list',
  imports: [],
  templateUrl: './evenement-list.component.html',
  styleUrl: './evenement-list.component.less'
})
export class EvenementListComponent {
  evenements: Evenement[] = [];
  totalPages!: number;
  totalItems!: number;
  currentPage!: number;
  
  constructor(private service: EvenementService) {}

  ngOnInit() {
    this.service.getEvenements().subscribe(response => {
      this.evenements = response.data;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
      this.currentPage = response.currentPage;
    });
  }
}
