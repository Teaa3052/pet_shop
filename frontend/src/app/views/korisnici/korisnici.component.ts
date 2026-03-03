import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  id: number;
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
    FormsModule,
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

  // Modal za dodavanje
  visible = false;

  // Modal za potvrdu brisanja
  potvrdaVisible = false;
  korisnikZaBrisanje: Korisnik | null = null;

  noviKorisnik: Partial<Korisnik> = {
    ime: '',
    prezime: '',
    email: ''
  };

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


  otvoriModal(): void {
    this.noviKorisnik = { ime: '', prezime: '', email: '' };
    this.visible = true;
  }

  zatvoriModal(): void {
    this.visible = false;
  }

  spremiKorisnika(): void {
    if (!this.noviKorisnik.ime || !this.noviKorisnik.prezime || !this.noviKorisnik.email) {
      alert('Sva polja su obavezna');
      return;
    }

    this.korisniciService.addKorisnik(this.noviKorisnik).subscribe({
      next: () => {
        this.ucitajKorisnike();
        this.zatvoriModal();
      },
      error: (err) => {
        console.error('Greška pri dodavanju korisnika', err);
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

    this.korisniciService.deleteKorisnik(this.korisnikZaBrisanje.id).subscribe({
      next: () => {
        this.ucitajKorisnike();
        this.zatvoriPotvrdu();
      },
      error: (err) => {
        console.error('Greška pri brisanju korisnika', err);
      }
    });
  }
}