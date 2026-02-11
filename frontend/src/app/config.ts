import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppConfig {
  //test
  /* public static ipAddress = 'http://192.168.8.16:3048/api/'; */

  //lab
   /* public static ipAddress = 'https://lab.fortuno.hr:4013/api/'; */

  //live pekar
 public static ipAddress = 'https://narudzba.pekar.hr:3048/api/';

}

