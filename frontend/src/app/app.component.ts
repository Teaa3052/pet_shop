import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Pet Shop';

  constructor(
    private auth: AuthService,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.auth.loadUserFromStorage();

    this.auth.checkSession().subscribe({
      next: user => this.auth.setUser(user),
      error: () => this.auth.setUser(null)
    });
  }

}


// Glavna komponenta angular aplikacije koja služi samo kao okvir i prikazuje sve 
// ostale stranice kroz <router-outlet>