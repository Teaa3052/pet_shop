import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/auth/login', 
      { email, password },
    { withCredentials: true}
  );
  }

  register(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/auth/register',
      data,
      { withCredentials: true}
    )
  }
}

// posrednik između login forme i backend api-ja; šalje login podatke backendu 
// i vraća odgovor komponenti, bez da komponenta direktno komunicira s API-jem