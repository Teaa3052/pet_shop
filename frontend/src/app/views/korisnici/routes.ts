import { Routes } from '@angular/router';
import { roleGuard } from '../../guards/role.guard';


export const routes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    loadComponent: () => import('./korisnici.component').then(m => m.KorisniciComponent),
    data: {
      title:`Korisnici`
    }
  }
];

