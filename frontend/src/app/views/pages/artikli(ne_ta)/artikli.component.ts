import { Component } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';


@Component({
  selector: 'app-artikli',
  standalone: true,
  imports: [DocsExampleComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective],
  templateUrl: './artikli.component.html',
  styleUrl: './artikli.component.scss'
})
export class ArtikliComponent {

  artikli: any = [
    {
    id: 1, 
    naziv: "ogrlica",
    sifra: "1234",
    cijena: "2.50"
    },
    {
      id: 2,
      naziv: "hrana",
      sifra: "5678",
      cijena: "10.50"
    },
    {
      id: 3,
      naziv: "poslastica",
      sifra: "9101",
      cijena: "4.50"
    }
  ];
  constructor() {
    
 
  }
  
}

