import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  ButtonDirective,
  ButtonCloseDirective,
  TableDirective,
  ModalModule
} from '@coreui/angular';

import { ArtikliService } from '../../services/artikli.service';
import { AuthService } from '../../services/auth.service';

interface Artikl {
  idartikl: number;
  naziv: string;
  sifra: number;
  cijena: number;
}

@Component({
  selector: 'app-artikli',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    ButtonDirective,
    ButtonCloseDirective,
    TableDirective,
    ModalModule
  ],
  templateUrl: './artikli.component.html',
  styleUrl: './artikli.component.scss'
})
export class ArtikliComponent implements OnInit {

  artikli: Artikl[] = [];

  naziv: string = '';
  cijena: number | null = null;

  visible = false;

  potvrdaVisible = false;
  artiklZaBrisanje: Artikl | null = null;

  constructor(
    private artikliService: ArtikliService,
    private auth: AuthService
  ) {}

  get isSuperuser() {
    return this.auth.currentUserValue?.role === 'superuser';
  }

  ngOnInit(): void {
    this.ucitajArtikle();
  }

  ucitajArtikle() {
    this.artikliService.getArtikli().subscribe({
      next: (data: Artikl[]) => this.artikli = data,
      error: (err) => console.error("Greška pri dohvacanju artikala", err)
    });
  }

  spremiArtikl() {
    const artikl = {
      naziv: this.naziv,
      cijena: this.cijena
    };

    this.artikliService.addArtikl(artikl).subscribe({
      next: () => {
        this.ucitajArtikle();
        this.visible = false;

        this.naziv = '';
        this.cijena = null;
      },
      error: (err) => console.error("Greška pri dodavanju artikla", err)
    });
  }

  obrisiArtikl(id: number) {
    this.artikliService.deleteArtikl(id).subscribe({
      next: () => this.ucitajArtikle(),
      error: (err) => console.error("Greška pri brisanju artikla", err)
    });
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  otvoriPotvrdu(artikl: Artikl) {
    this.artiklZaBrisanje = artikl;
    this.potvrdaVisible = true;
  }

  zatvoriPotvrdu() {
    this.potvrdaVisible = false;
    this.artiklZaBrisanje = null;
  }

  potvrdiBrisanje() {
    if (!this.artiklZaBrisanje) return;

    this.artikliService.deleteArtikl(this.artiklZaBrisanje.idartikl).subscribe({
      next: () => {
        this.ucitajArtikle();
        this.zatvoriPotvrdu();
      },
      error: (err) => console.error("Greška pri brisanju artikla", err)
    });
  }
}