import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  _statsUsersURL = "http://localhost:3200/admin/statUser";
  _statrequests = "http://localhost:3200/admin/statrequests";
  _statWs = "http://localhost:3200/admin/statWS";
  _morestatWS = "http://localhost:3200/admin/morestatWS";
  _statConv = "http://localhost:3200/admin/statConv";
  _morestatConv = "http://localhost:3200/admin/morestatConv";
  _generateRapport = "http://localhost:3200/admin/fileget"
  
  constructor(private http: HttpClient) { }
  isLoggedAdmin() {
    let token = localStorage.getItem('token');
    if (token === null) {
      return "401";
    } else {
      const helper = new JwtHelperService();
      const roleDecoded = helper.decodeToken(token).role;
      if (roleDecoded === "admin")
        return true;
    }
    return "403";
  }
  statUser() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.post(this._statsUsersURL, null, options);
  }

  statsRequest() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.post(this._statrequests, null, options);
  }


  statsWS() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.post(this._statWs, null, options);
  }

  morestatsWS() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.get(this._morestatWS, options);
  }

  statsConv() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.post(this._statConv, null, options);
  }

  morestatsConv() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.get(this._morestatConv, options);
  }

  generateRapport(type, data, req, totalreq, totalearn, totaluser) {
    let Data = {
      data: data,
      req: req,
      totalreq: totalreq,
      totalearn: totalearn,
      totaluser: totaluser,
      type: type
    }
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'type': type,
      'data': JSON.stringify(Data)
    });
    let options = { headers: headers };
    return this.http.get<any>(this._generateRapport,options);
  }

 
}
