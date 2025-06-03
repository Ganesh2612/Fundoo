import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
baseurl="https://fundoonotes.incubation.bridgelabz.com/api";
constructor(private http:HttpClient) { }
getHeader(){
    const header=new HttpHeaders({
      Authorization:localStorage.getItem('token')||''
    })
    return header;
  }
getApi(endPoint:string, headers: HttpHeaders=new HttpHeaders()){
    return this.http.get(this.baseurl+endPoint,{headers});
  }
postApi(endPoint:string,payload:any,headers:HttpHeaders=new HttpHeaders){
    return this.http.post(this.baseurl+endPoint,payload,{headers});
  }
}
