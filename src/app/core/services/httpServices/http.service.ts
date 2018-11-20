import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://34.213.106.173/api/';
  constructor(public http: HttpClient) { }

  /**********************************User Services*******************************/

  postPassword(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postEmail(url, body) {
    url = this.url + url;
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
    url = this.url + url;
    return this.http.post(url, body);
  }
  getConfig(url) {
    return this.http.get(url);
  }
  postLogout(url) {
    url = this.url + url;
    // console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
    return this.http.post(url, {}, httpOptions)
  }

  // *********************************NOTES SERVICE**********************************/

  postJSON(url, body) {
    let accessToken = localStorage.getItem('token');
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': accessToken
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  encodedPostForm(url, body) {
    // let accessToken = localStorage.getItem('token');
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': accessToken
      })
    }
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }
  getJSON(url) {
    // let accessToken = localStorage.getItem('token')
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': accessToken
      })
    }
    return this.http.get(url, httpOptions)
  }
  encodedGetForm(url) {
    let accessToken = localStorage.getItem('token');
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': accessToken
      })
    };
    return this.http.get(url, httpOptions)
  }
  deleteTheLabel(url) {
    url = this.url + url;
    return this.http.delete(url);
  }
  httpAddImage(url, body, token) {
    console.log(token);
    url = this.url + url;
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  public httpGetReminder(url, token) {
    url = this.url + url;
    console.log(token);
    var httpOptions = {
      headers: new HttpHeaders({

        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions)
  }
/**************************Notes Services End************************** */
}