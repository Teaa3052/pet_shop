import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./korisnici.component').then(m => m.KorisniciComponent),
    data: {
      title: $localize`Korisnici`
    }
  }
];

