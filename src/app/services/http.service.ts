import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  // configUrl = 'assets/config.json';
  getConfig() {
    return this.http.get('http://34.213.106.173/api/user/service');
  }
}
