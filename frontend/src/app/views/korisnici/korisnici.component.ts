import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KorisniciService } from '../../services/korisnici.service';

import {
  RowComponent, ColComponent, CardComponent, CardBodyComponent,
  TableDirective, ButtonDirective, ButtonCloseDirective,
  ModalComponent, ModalHeaderComponent, ModalBodyComponent,
  ModalFooterComponent, ModalTitleDirective
} from '@coreui/angular';

@Component({
  selector: 'app-korisnici',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    RowComponent, ColComponent, CardComponent, CardBodyComponent,
    TableDirective, ButtonDirective, ButtonCloseDirective,
    ModalComponent, ModalHeaderComponent, ModalBodyComponent,
    ModalFooterComponent, ModalTitleDirective
  ],
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss'
})
export class KorisniciComponent implements OnInit {

  korisnici: any[] = [];

  // Modal za dodavanje
  public visible = false;

  // Modal za potvrdu brisanja
  potvrdaVisible = false;
  korisnikZaBrisanje: number | null = null;

  noviKorisnik = {
    ime: '',
    prezime: '',
    email: '',
  };

  constructor(private korisniciService: KorisniciService) {}

  ngOnInit(): void {
    this.ucitajKorisnike();
  }

  // Učitavanje korisnika
  ucitajKorisnike() {
    this.korisniciService.getKorisnici().subscribe({
      next: (data: any[]) => {
        this.korisnici = data;
      },
      error: (err) => {
        console.error("Greška pri dohvacanju korisnika", err);
      }
    });
  }

  // MODAL ZA DODAVANJE
  otvoriModal() {
    this.noviKorisnik = { ime: '', prezime: '', email: '' };
    this.visible = true;
  }

  zatvoriModal() {
    this.visible = false;
  }

  // SPREMANJE KORISNIKA
  spremiKorisnika() {
    this.korisniciService.addKorisnik(this.noviKorisnik).subscribe({
      next: () => {
        this.ucitajKorisnike();
        this.visible = false;
        this.noviKorisnik = { ime: '', prezime: '', email: '' };
      },
      error: (err) => {
        console.error("Greška pri dodavanju korisnika", err);
      }
    });
  }

  // MODAL ZA POTVRDU BRISANJA
  otvoriPotvrdu(id: number) {
    this.korisnikZaBrisanje = id;
    this.potvrdaVisible = true;
  }

  zatvoriPotvrdu() {
    this.potvrdaVisible = false;
    this.korisnikZaBrisanje = null;
  }

  // BRISANJE KORISNIKA
  potvrdiBrisanje() {
    if (!this.korisnikZaBrisanje) return;

    this.korisniciService.deleteKorisnik(this.korisnikZaBrisanje).subscribe({
      next: () => {
        this.ucitajKorisnike();
        this.zatvoriPotvrdu();
      },
      error: (err) => {
        console.error("Greska pri brisanju korisnika", err);
      }
    });
  }
}