import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();


constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  setUser(user: any) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/auth/login',
      { email, password },
      { withCredentials: true }
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/auth/register',
      data,
      { withCredentials: true }
    );
  }

  logOut() {
    return this.http.post(
      'http://localhost:3000/api/auth/logout',
      {},
      { withCredentials: true }
    );
  }


  loadUserFromStorage() {
    const stored = localStorage.getItem('currentUser');

    if(!stored ||stored == "undefined" || stored == "null") {
      this.currentUserSubject.next(null);
      return;
    }
    try {
      this.currentUserSubject.next(JSON.parse(stored));
    } catch (e) {
      console.error("Invalid JSON in localStorage: ", stored);
      this.currentUserSubject.next(null);
    }
  }

  clearUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  checkSession() {
    return this.http.get(
      'http://localhost:3000/api/auth/me',
      { withCredentials: true }
    );
  }
  
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

}

// posrednik između login forme i backend api-ja; šalje login podatke backendu 
// i vraća odgovor komponenti, bez da komponenta direktno komunicira s API-jem