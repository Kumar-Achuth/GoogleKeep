import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl
  constructor(public http: HttpClient) { }

  /**********************************User Services*******************************/
  postPassword(url, body) {
    url = this.baseUrl + url;
    return this.http.post(url, body);
  }
  postEmail(url, body) {
    url = this.baseUrl + url;
    return this.http.post(url, body);
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  loginPost(url, body) {
    url = this.baseUrl + url;
    return this.http.post(url, body);
  }
  getConfig(url) {
    url = this.baseUrl + url;
    return this.http.get(url);
  }
  postLogout(url) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, {}, httpOptions)
  }

  // *********************************NOTES SERVICE**********************************/

  postJSON(url, body) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  encodedPostForm(url, body) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }
  getJSON(url) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(url, httpOptions)
  }
  encodedGetForm(url) {
    url = this.baseUrl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.get(url, httpOptions)
  }
  deleteTheLabel(url) {
    url = this.baseUrl + url;
    return this.http.delete(url);
  }
  httpAddImage(url, body, token){
    url = this.baseUrl + url;
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
/**************************Notes Services End************************** */
}