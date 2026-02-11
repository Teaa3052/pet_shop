import { Component, inject } from '@angular/core';
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
  selector: 'app-korisnici',
  standalone: true,
  imports: [DocsExampleComponent, CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ThemeDirective],
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss'
})


export class KorisniciComponent {

  korisnici = [
    {
      id: 1,
      ime: "Mario",
      prezime: "Marić"
    }, 
    {
      id: 2,
      ime: "Ivana",
      prezime: "Ivanković"
    }, 
    { 
      id: 3,
      ime: "Ivan",
      prezime:"Širić"
    }
  ]

  constructor() {

  }
  test(){
    this.visible = !this.visible;
  }

  public visible = false;

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }
} 