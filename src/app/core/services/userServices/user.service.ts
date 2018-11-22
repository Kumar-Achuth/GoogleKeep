import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService) { }
  pushToken(body) {
    return this.http.postJSON('user/registerPushToken', body)
  }
  postLogin(body){
    return this.http.loginPost('user/login',body)
  }
  postReset(body){
    return this.http.encodedPostForm("user/reset-password",body)
  }
  postPassword(body){
    return this.http.loginPost('user/reset',body)
  }
  getService(){
    return this.http.getConfig('user/service')
  }
  postConfig(body){
    return this.http.loginPost('user/userSignup',body);
  }
  logout(){
    return this.http.postLogout('user/logout');
  }
  getUsers(){
    return this.http.getJSON('user');
  }
  searchUserList(body){
    return this.http.postJSON('user/searchUserList',body)
  }
} 
