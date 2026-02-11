import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { RegisterComponent } from './views/pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Register (direktna ruta)
  {
    path: 'register',
    component: RegisterComponent
  },

  // Layout za sve unutarnje stranice
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'artikli',
        loadChildren: () =>
          import('./views/artikli/routes').then((m) => m.routes)
      },
      {
        path: 'korisnici',
        loadChildren: () =>
          import('./views/korisnici/routes').then((m) => m.routes)
      }
    ]
  },

  // Error pages
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: { title: 'Page 404' }
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: { title: 'Page 500' }
  },

  // Login (lazy-load)
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: { title: 'Login Page' }
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' }
];

// Definira sve putanje i određuje koji se layout stranica ili modul učitava za svaki URL 