import { Component } from '@angular/core';
import { ClaimsService } from '../../services/claims.service';
import { Claims } from '../../models/Claims';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './claims.component.html',
  styleUrl: './claims.component.css'
})
export class ClaimsComponent {
  constructor(private ClaimsService : ClaimsService){}
  allReclamation: Claims[] = [];
  allsReclamation:any
  percentage!:Map<string, number>;
   claimTypes = ['CARPOLING', 'COLLOCATION', 'Other'];
   percentageMap = new Map();
   pageSize = 3; // Nombre d'éléments par page
  totalItems = 0; // Nombre total d'éléments
  currentPage = 0; //
  ngOnInit(): void {
    this.getClaims();

      this.ClaimsService.calculateClaimPercentage().subscribe((dat) => {
        // @ts-ignore
        this.percentage = dat; 
        this.percentageMap= this.fillMissingPercentages(this.percentage);
      });
   
  }
  
  search(event: any): void {
    const query = event.target.value; // Obtenez la valeur du champ de recherche
    if (!query) {
      this.getClaims(); // Si la recherche est vide, afficher toutes les réclamations
      return;
    }

    // Filtrer les réclamations basées sur le titre, le nom du client, la description, etc.
    this.allReclamation = this.allReclamation.filter(claim =>
      claim.title.toLowerCase().includes(query.toLowerCase()) ||
      claim.user.username.toLowerCase().includes(query.toLowerCase()) ||
      claim.description.toLowerCase().includes(query.toLowerCase()) ||
      claim.typeClaim.toLowerCase().includes(query.toLowerCase()) ||
      claim.statusClaims.toLowerCase().includes(query.toLowerCase())
      
    );
  }
  
  getClaims(): void {
    this.ClaimsService.getClaims(this.currentPage, this.pageSize)
      .subscribe((data: any) => { 
        console.log(data)
        this.allReclamation = data.content; 
        this.totalItems = data.totalElements; 
        this.allsReclamation=data.content
        console.log(this.allsReclamation)
      });
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.getClaims();
  }
  
  toggleDropdown(claim: Claims): void {
    claim.isDropdownOpen = !claim.isDropdownOpen;
  }
statusclaim(id:number,status:string){
  console.log(id+status)
  this.ClaimsService.statusClaims(id,status).subscribe(
    response => {
      
        location.reload();
    },
    error => {
        console.error('Erreur  :', error);
    }
);
}
  closeDropdown(claim: Claims): void {
    claim.isDropdownOpen = false;
  }
   fillMissingPercentages(percentage: Map<string, number>): Map<string, number> {
    const filledPercentage = new Map<string, number>();
    const percentageMap = new Map(Object.entries(percentage));
    this.claimTypes.forEach(type => {
        filledPercentage.set(type, percentageMap.get(type) || 0);
    });
    return filledPercentage;
}
}
