import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://34.213.106.173/api/';

  constructor(private http: HttpClient) { }
  getConfig(url){
     url= this.url+url;
     return this.http.get(url);
  }
  postConfig(url,body){
    url=this.url+url;
    return this.http.post(url,body);
  }
  postPassword(url,body){
    url=this.url+url;
    return this.http.post(url,body);
  }
  postLogin(url,body){
    url = this.url+url;
    return this.http.post(url,body);
  }
  postEmail(url,body){
    url = this.url+url;
    return this.http.post(url,body);
  }
  postReset(name,input,accessToken){
    console.log(input);
    console.log(accessToken)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': accessToken
      })
    };
    return this.http.post(this.url+"/"+name,this.getFormUrlEncoded(input),httpOptions)
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
  postLogout(url,token){
    url = this.url+url;
   console.log(token)
   const httpOptions = {
     headers : new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization' : token
     })
   };
   return this.http.post(url,{},httpOptions)
  }

  postNotes(url,input,token){
url = this.url+url;
console.log(token);
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Authorization' : token
  })
}
return this.http.post(url,this.getFormUrlEncoded(input),httpOptions)
  }

  getNotes(url,token){
    url =this.url +url;
    // console.log(token);
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : token
      })
    };
    return this.http.get(url,httpOptions)
  }


}