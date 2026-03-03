import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class ArtikliService { 

    constructor(private http: HttpClient) {}

getArtikli() {
  return this.http.get<any[]>('http://localhost:3000/api/artikli', {
        withCredentials: true 
});
}

addArtikl(artikl: any) {
    return this.http.post('http://localhost:3000/api/artikli', artikl, {
        withCredentials: true
    })
}

deleteArtikl(id: number) {
    return this.http.delete(`http://localhost:3000/api/artikli/${id}`, {
        withCredentials: true
    });
}
}