import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class KorisniciService { 

    private apiUrl = 'http://localhost:3000/api/korisnik';

    constructor(private http: HttpClient) {}

getKorisnici() {
  return this.http.get<any[]>(this.apiUrl, {
      withCredentials: true    
    });
}

addKorisnik(korisnik: any) {
    return this.http.post(this.apiUrl, korisnik, {
        withCredentials: true
    });
}

deleteKorisnik(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`, {
        withCredentials: true
        });
    }
}