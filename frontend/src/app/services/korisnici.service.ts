import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class KorisniciService { 

    constructor(private http: HttpClient) {}

getKorisnici() {
  return this.http.get<any[]>('http://localhost:3000/api/korisnik');
}

addKorisnik(korisnik: any) {
    return this.http.post('http://localhost:3000/api/korisnik', korisnik)
}

deleteKorisnik(id: number){
    return this.http.delete(`http://localhost:3000/api/korisnik/${id}`
);
}
}