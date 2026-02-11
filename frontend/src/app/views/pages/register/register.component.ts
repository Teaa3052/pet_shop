import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RouterLink, FormsModule, RouterOutlet, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class RegisterComponent {

  ime = '';
  email = '';
  password = '';
  password2 = '';
  errorMessage = '';
  successMessage = '';

  constructor( private authService: AuthService, private router: Router) { }

  onRegister() {

    if(this.password != this.password2) {
      this.errorMessage = 'Lozinke se ne poklapaju';
      return;
    }

    const data = {
      ime: this.ime,
      email: this.email,
      password: this.password
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.successMessage = 'Registracija uspješna';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Greška pri registraciji';
      }
    });
  }
}
