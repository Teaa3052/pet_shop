import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./artikli.component').then(m => m.ArtikliComponent),
    data: {
      title: $localize`Artikli`
    }
  }
];

