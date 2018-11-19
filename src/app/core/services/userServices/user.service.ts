import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl= environment.baseUrl;
  constructor(private http : HttpService) { }
  getConfig() {
    let url = this.baseUrl + '/user/service';
    return this.http.getConfig(url);
  }
  postConfig(body) {
    let url = this.baseUrl + 'user/userSignUp';
    return this.http.postLogin(url, body);
  }
}
