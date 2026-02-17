import { Component} from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { ArtikliService } from '../../services/artikli.service';


@Component({
  selector: 'app-artikli',
  standalone: true,
  imports: [ CommonModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, ButtonDirective, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ThemeDirective, ButtonCloseDirective, ModalBodyComponent, ModalFooterComponent],
  templateUrl: './artikli.component.html',
  styleUrl: './artikli.component.scss'
})

export class ArtikliComponent implements OnInit {

  artikli: any [] = [];

  constructor(private artikliService: ArtikliService ) {}

  ngOnInit(): void {
      this.ucitajArtikle();
  }

  ucitajArtikle() {
    this.artikliService.getArtikli().subscribe({
      next: (data: any[]) =>{
        this.artikli = data; 
      },
      error: (err: any) => {
        console.error("Greska pri dohvacanju artikala", err)
      }
    })
  }

  test(){
    this.visible = !this.visible;
  }

  public visible = false;

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}

