import { Component, inject  } from '@angular/core';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ThemeDirective
} from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artikli',
  standalone: true,
  imports: [DocsExampleComponent, CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent],
  templateUrl: './artikli.component.html',
  styleUrl: './artikli.component.scss'
})
export class ArtikliComponent {


  artikli = [
    {
      id: 1,
      naziv: 'Ogrilica za pse',
      sifra: '142535',
      cijena: 10.50
    },
    {
      id: 2,
      naziv: 'Hrana za pse',
      sifra: '213214',
      cijena: 20
    }
  ]
  constructor(){
   
  }

  test(){
    this.visible = !this.visible;
  }

  public visible = false;

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}

