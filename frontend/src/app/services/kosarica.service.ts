import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface StavkaKosarice {
  idartikl: number;
  naziv: string;
  cijena: number;
  kolicina: number;
}

@Injectable({
  providedIn: 'root'
})
export class KosaricaService {

  private stavkeSubject = new BehaviorSubject<StavkaKosarice[]>(this.ucitajIzStorage());
  stavke$ = this.stavkeSubject.asObservable();

  get stavke(): StavkaKosarice[] {
    return this.stavkeSubject.value;
  }

  get ukupnoKomada(): number {
    return this.stavke.reduce((acc, s) => acc + s.kolicina, 0);
  }

  get ukupnaCijena(): number {
    return this.stavke.reduce((acc, s) => acc + s.cijena * s.kolicina, 0);
  }

  dodaj(artikl: { idartikl: number; naziv: string; cijena: number | string }) {
    if (this.stavke.some(s => s.idartikl === artikl.idartikl)) {
      this.promijeniKolicinu(artikl.idartikl, 1);
      return;
    }

    this.spremi([
      ...this.stavke,
      {
        idartikl: artikl.idartikl,
        naziv: artikl.naziv,
        // PostgreSQL vraća NUMERIC kao string
        cijena: Number(artikl.cijena),
        kolicina: 1
      }
    ]);
  }

  // stavka s količinom 0 ispada iz košarice
  promijeniKolicinu(idartikl: number, promjena: number) {
    const stavke = this.stavke
      .map(s => s.idartikl === idartikl ? { ...s, kolicina: s.kolicina + promjena } : s)
      .filter(s => s.kolicina > 0);

    this.spremi(stavke);
  }

  isprazni() {
    this.spremi([]);
  }

  private spremi(stavke: StavkaKosarice[]) {
    this.stavkeSubject.next(stavke);
    localStorage.setItem('kosarica', JSON.stringify(stavke));
  }

  private ucitajIzStorage(): StavkaKosarice[] {
    try {
      return JSON.parse(localStorage.getItem('kosarica') || '[]');
    } catch (e) {
      return [];
    }
  }
}
