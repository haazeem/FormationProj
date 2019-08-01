import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _inscriptionUrl = "http://localhost:3200/user/inscription";
  private _connexionUrl = "http://localhost:3200/user/connexion";
  private _info = "http://localhost:3200/user/infoService";
  private _convert = "http://localhost:3200/user/uploadfile"
  private _infoConvert = "http://localhost:3200/user/infoConvert"
  private _listefiles = "http://localhost:3200/user/listefiles"
  private _stream = "http://localhost:3200/user/streamwav";
  private _deconnexionURL = "http://localhost:3200/user/deconnexion";
  private _CardDetailURL = "http://localhost:3200/user/addCardDetails";
  private _deleteFile = "http://localhost:3200/user/deleteFile";
  private _contactAdd = "http://localhost:3200/user/contactAdd";
  constructor(private http: HttpClient) { }
  isLoggedFreeUser() {
    let token = localStorage.getItem('token');
    if (token === null) {
      return "401";
    } else {
      const helper = new JwtHelperService();
      const roleDecoded = helper.decodeToken(token).role;
      if (roleDecoded === "free")
        return true;
    }
    return "403";
  }
  isLoggedPremiumUser() {
    let token = localStorage.getItem('token');
    if (token === null) {
      return "401";
    } else {
      const helper = new JwtHelperService();
      const roleDecoded = helper.decodeToken(token).role;
      if (roleDecoded === "premium")
        return true;
    }
    return "403";
  }

  userInscription(data) {
    return this.http.post<any>(this._inscriptionUrl, data)
  }
  userConnexion(data) {
    return this.http.post<any>(this._connexionUrl, data)
  }
  userDeconnexion() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
    });
    let options = { headers: headers };
    return this.http.post(this._deconnexionURL, null, options);
  }
  addCreditInfo(data) {
    return this.http.post(this._CardDetailURL, data);
  }

  infoUser() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.get(this._info, options);
  }
  convFile(data, file) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'language': data.lang
    });
    let options = { headers: headers };
    return this.http.post(this._convert, file, options);
  }
  infoConvert() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.get(this._infoConvert, options);
  }
  listeFiles() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.get(this._listefiles, options);
  }

  streamFiles() {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });
    let options = { headers: headers };
    return this.http.get(this._stream, options);
  }
  streamer(name) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),
      'file': name
    });
    let options = { headers: headers };
    return this.http.get(this._stream, options);
  }

  deleteFiles(data) {
    let headers = new HttpHeaders({
      'Authorization': localStorage.getItem('token'),

    });
    let options = { headers: headers };
    return this.http.post(this._deleteFile, { paths: data }, options);
  }

  contactAdd(data) {
    return this.http.post(this._contactAdd, data);
  }
}
