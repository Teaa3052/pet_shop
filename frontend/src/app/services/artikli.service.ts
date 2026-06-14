import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ArtikliService { 

    private apiUrl = `${environment.apiUrl}/api/artikli`;

    constructor(private http: HttpClient) {}

    getArtikli() {
        return this.http.get<any[]>(this.apiUrl, {
            withCredentials: true 
        });
    }

    addArtikl(artikl: any) {
        return this.http.post(this.apiUrl, artikl, {
            withCredentials: true
        });
    }

    deleteArtikl(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`, {
            withCredentials: true
        });
    }
}