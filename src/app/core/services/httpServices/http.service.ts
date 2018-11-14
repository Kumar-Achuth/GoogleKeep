import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://34.213.106.173/api/';

  constructor(private http: HttpClient) { }
  getConfig(url) {
    url = this.url + url;
    return this.http.get(url);
  }
  postConfig(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postPassword(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postLogin(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postEmail(url, body) {
    url = this.url + url;
    return this.http.post(url, body);
  }
  postReset(name, input, accessToken) {
    console.log(input);
    console.log(accessToken)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': accessToken
      })
    };
    return this.http.post(this.url + "/" + name, this.getFormUrlEncoded(input), httpOptions)
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
  postLogout(url, token) {
    url = this.url + url;
    console.log(token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, {}, httpOptions)
  }

  postNotes(url, input, token) {
    url = this.url + url;
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    }
    return this.http.post(url, this.getFormUrlEncoded(input), httpOptions)
  }

  getNotes(url, token) {
    url = this.url + url;
    // console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions)
  }

  postTrash(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }

  getTrashNotes(url, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions)
  }
  postArchive(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  getArchiveNotes(url, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions)
  }
  postColor(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  noteUpdate(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }
  addLabel(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  getLabels(url, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    return this.http.get(url, httpOptions)

  }
  deleteLabel(url, body) {
    url = this.url + url;
    return this.http.delete(url, body);
  }
  getUpdatedLabel(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  goLabel(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  deleteChip(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  checkAdd(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(url, body, httpOptions)
  }
  postCheckList(url, input, token) {
    url = this.url + url;
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    }
    return this.http.post(url, this.getFormUrlEncoded(input), httpOptions)
  }
  getindividualLabel(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    }
    return this.http.post(url, this.getFormUrlEncoded(body), httpOptions)
  }
  foreverTrash(url, body, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.http.post(url, body, httpOptions)
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
  getRemind(url, token) {
    url = this.url + url;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.http.get(url, httpOptions)
  }
  httpAddReminder(url,token,body){
    url = this.url + url;
    console.log(token);
    var httpOptions={
      headers:new HttpHeaders({
       'Authorization':token
      })
    };
    return this.http.post(url,body,httpOptions)
  } 
 public httpGetReminder(url,token){
  url = this.url + url;
    console.log(token);
    var httpOptions={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.get(url,httpOptions)
  }
}