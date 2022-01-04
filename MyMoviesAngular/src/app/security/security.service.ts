import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { authenticationResponse } from './security.model';
import { userCredentials} from './security.model'
import {resetPwCredentials} from './security.model'
import {newPwCredentials} from './security.model'

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http : HttpClient) { }

  private apiURL = environment.apiURL + "/accounts"
  private readonly tokenKey : string = 'token'
  private readonly expirationTokenKey : string = 'token-expiration'
  private readonly roleFiled = "role"

  isAuthenticated() : boolean{
    const token = localStorage.getItem(this.tokenKey);
      if (!token) {
        return false;
      }
    const expiration : any = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration)

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.expirationTokenKey)
  }

  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token){
      return ''
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]))
    return dataToken[field];
  }

  getRole() : string {
    return this.getFieldFromJWT(this.roleFiled);
  }

  register(userCredentials: userCredentials) : Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL + "/create", userCredentials)
  }

  login(userCredentials: userCredentials) : Observable<authenticationResponse> {
    return this.http.post<authenticationResponse>(this.apiURL + "/login", userCredentials)
  }

  forgotpw(resetPwCredentials: resetPwCredentials) {
    return this.http.post<authenticationResponse>(this.apiURL + "/forgotpw", resetPwCredentials)
  }

  resetpassword(resetPwCredentials: newPwCredentials) {
    return this.http.post<authenticationResponse>(this.apiURL + "/resetpassword", resetPwCredentials)
  }

  saveToken(authenticationResponse : authenticationResponse){
    localStorage.setItem(this.tokenKey, authenticationResponse.token)
    localStorage.setItem(this.expirationTokenKey, authenticationResponse.expiration.toString())
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }
}
