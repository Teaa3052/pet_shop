import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KorisniciService } from '../../services/korisnici.service';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { AuthService } from '../../services/auth.service';

import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  TableDirective,
  ButtonDirective,
  ButtonCloseDirective,
  ModalModule
} from '@coreui/angular';

interface Korisnik {
  idkorisnik: number;
  ime: string;
  prezime: string;
  email: string;
  role?: string;
}

@Component({
  selector: 'app-korisnici',
  standalone: true,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    TableDirective,
    ButtonDirective,
    ButtonCloseDirective,
    ConfirmModalComponent,
    ModalModule
  ],
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss'
})
export class KorisniciComponent implements OnInit {

  korisnici: Korisnik[] = [];

  // Modal za potvrdu brisanja
  potvrdaVisible = false;
  korisnikZaBrisanje: Korisnik | null = null;

  constructor(
    private korisniciService: KorisniciService,
    private auth: AuthService
  ) {}

  get isSuperuser() {
    return this.auth.currentUserValue?.role === 'superuser';
  }

  ngOnInit(): void {
    this.ucitajKorisnike();
  }


  ucitajKorisnike(): void {
    this.korisniciService.getKorisnici().subscribe({
      next: (data: Korisnik[]) => {
        this.korisnici = data;
      },
      error: (err) => {
        console.error('Greška pri dohvaćanju korisnika', err);
      }
    });
  }


  otvoriPotvrdu(korisnik: Korisnik): void {
    this.korisnikZaBrisanje = korisnik;
    this.potvrdaVisible = true;
  }

  zatvoriPotvrdu(): void {
    this.potvrdaVisible = false;
    this.korisnikZaBrisanje = null;
  }

  potvrdiBrisanje(): void {
    if (!this.korisnikZaBrisanje) return;

    if (this.korisnikZaBrisanje.role === 'superuser') {
      alert('Superuser se ne može obrisati');
      this.zatvoriPotvrdu();
      return;
    }

    this.korisniciService.deleteKorisnik(this.korisnikZaBrisanje.idkorisnik).subscribe({
      next: () => {
        this.ucitajKorisnike();
        this.zatvoriPotvrdu();
      },
      error: (err) => {
        console.error('Greška pri brisanju korisnika', err);
        alert(err.error?.error || err.error?.message || 'Greška pri brisanju korisnika');
        this.zatvoriPotvrdu();
      }
    });
  }
}