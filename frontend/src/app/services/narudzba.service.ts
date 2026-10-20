import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NarudzbaService {

    private apiUrl = `${environment.apiUrl}/api/narudzba`;

    constructor(private http: HttpClient) {}

    posaljiNarudzbu(stavke: { idartikl: number; kolicina: number }[]) {
        return this.http.post<any>(this.apiUrl, { stavke }, {
            withCredentials: true
        });
    }
}
